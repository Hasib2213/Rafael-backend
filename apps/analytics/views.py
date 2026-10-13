from django.core.cache import cache
import math
import calendar
from datetime import timedelta
from django.utils import timezone
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.db.models import Sum, Q
from apps.analytics.models import ActivityAuditLog
from apps.analytics.serializers import ActivityAuditLogSerializer
from apps.briefings.models import Briefing
from apps.subscriptions.models import BillingTransaction

User = get_user_model()


def get_y_axis_info(max_val):
    if max_val <= 0:
        return ["$100", "$75", "$50", "$25", "$0"], 100
    order = 10 ** math.floor(math.log10(max_val)) if max_val > 0 else 1
    ceiling = math.ceil(max_val / order) * order
    if ceiling == max_val and max_val % 4 != 0:
        ceiling += order
    step = ceiling / 4
    labels = [
        f"${int(ceiling):,}",
        f"${int(ceiling - step):,}",
        f"${int(ceiling - step * 2):,}",
        f"${int(ceiling - step * 3):,}",
        "$0",
    ]
    return labels, ceiling



DASHBOARD_OVERVIEW_CACHE_KEY = 'curio_dashboard_overview'
DASHBOARD_OVERVIEW_CACHE_TIMEOUT = 300  # 5 minutes

class DashboardOverviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        requested_timeframe = request.query_params.get('timeframe')
        requested_growth = request.query_params.get('growth_period')

        if not requested_timeframe and not requested_growth:
            cached_overview = cache.get(DASHBOARD_OVERVIEW_CACHE_KEY)
            if cached_overview is not None:
                resp = Response(cached_overview)
                resp['X-Cache'] = 'HIT'
                resp['Cache-Control'] = 'private, max-age=60, stale-while-revalidate=300'
                return resp

        now = timezone.now()

        # 1. Four metric cards
        total_users = User.objects.count()
        total_revenue = BillingTransaction.objects.filter(is_success=True).aggregate(
            total=Sum('amount')
        )['total'] or 0.0
        total_video_processed = Briefing.objects.count()
        total_ai_summary = Briefing.objects.filter(summary__isnull=False).exclude(summary='').count()

        all_success_tx = BillingTransaction.objects.filter(is_success=True)

        # 2. Dynamic Revenue Stats - Yearly (last 7 years)
        current_year = now.year
        years = [current_year - 6 + i for i in range(7)]
        y_rev = {y: 0.0 for y in years}
        for t in all_success_tx:
            if t.created_at and t.created_at.year in y_rev:
                y_rev[t.created_at.year] += float(t.amount)

        y_users = {y: 0 for y in years}
        for u in User.objects.all():
            if u.date_joined and u.date_joined.year in y_users:
                y_users[u.date_joined.year] += 1

        max_y = max(y_rev.values()) if any(y_rev.values()) else 1.0
        yearly_labels, ceiling_y = get_y_axis_info(max_y)
        yearly_bars = []
        for y in years:
            rev = y_rev[y]
            uc = y_users[y]
            # Scale proportionally to the Y-axis ceiling
            h = int(18 + (rev / ceiling_y) * 162) if rev > 0 else (28 if uc > 0 else 18)
            yearly_bars.append({
                'label': str(y),
                'height': h,
                'value': f"${int(rev):,}",
                'amount': rev,
                'tooltip': f"${int(rev):,} ({uc} Users)" if (rev > 0 or uc > 0) else "$0 (0 Users)",
            })

        # 3. Dynamic Revenue Stats - Monthly (last 7 months)
        unique_months = []
        for i in range(6, -1, -1):
            d = now - timedelta(days=i * 30)
            unique_months.append((d.year, d.month))
        seen = set()
        dedup_months = []
        for ym in unique_months:
            if ym not in seen:
                seen.add(ym)
                dedup_months.append(ym)
        while len(dedup_months) < 7:
            fy, fm = dedup_months[0]
            pm = fm - 1 if fm > 1 else 12
            py = fy if fm > 1 else fy - 1
            dedup_months.insert(0, (py, pm))
        dedup_months = dedup_months[-7:]

        m_rev = {ym: 0.0 for ym in dedup_months}
        for t in all_success_tx:
            if t.created_at and (t.created_at.year, t.created_at.month) in m_rev:
                m_rev[(t.created_at.year, t.created_at.month)] += float(t.amount)

        m_users = {ym: 0 for ym in dedup_months}
        for u in User.objects.all():
            if u.date_joined and (u.date_joined.year, u.date_joined.month) in m_users:
                m_users[(u.date_joined.year, u.date_joined.month)] += 1

        max_m = max(m_rev.values()) if any(m_rev.values()) else 1.0
        monthly_labels, ceiling_m = get_y_axis_info(max_m)
        monthly_bars = []
        for ym in dedup_months:
            rev = m_rev[ym]
            uc = m_users[ym]
            h = int(18 + (rev / ceiling_m) * 162) if rev > 0 else (28 if uc > 0 else 18)
            monthly_bars.append({
                'label': calendar.month_abbr[ym[1]],
                'height': h,
                'value': f"${int(rev):,}",
                'amount': rev,
                'tooltip': f"${int(rev):,} ({uc} Users)" if (rev > 0 or uc > 0) else "$0 (0 Users)",
            })

        # 4. Dynamic Revenue Stats - Weekly (last 7 days)
        days = [(now - timedelta(days=i)).date() for i in range(6, -1, -1)]
        w_rev = {d: 0.0 for d in days}
        for t in all_success_tx:
            if t.created_at and t.created_at.date() in w_rev:
                w_rev[t.created_at.date()] += float(t.amount)

        w_users = {d: 0 for d in days}
        for u in User.objects.all():
            if u.date_joined and u.date_joined.date() in w_users:
                w_users[u.date_joined.date()] += 1

        max_w = max(w_rev.values()) if any(w_rev.values()) else 1.0
        weekly_labels, ceiling_w = get_y_axis_info(max_w)
        weekly_bars = []
        for d in days:
            rev = w_rev[d]
            uc = w_users[d]
            h = int(18 + (rev / ceiling_w) * 162) if rev > 0 else (28 if uc > 0 else 18)
            weekly_bars.append({
                'label': d.strftime('%a'),
                'height': h,
                'value': f"${int(rev):,}",
                'amount': rev,
                'tooltip': f"${int(rev):,} ({uc} Users)" if (rev > 0 or uc > 0) else "$0 (0 Users)",
            })

        revenue_data_map = {
            'Yearly': yearly_bars,
            'Monthly': monthly_bars,
            'Weekly': weekly_bars,
        }
        y_axis_map = {
            'Yearly': yearly_labels,
            'Monthly': monthly_labels,
            'Weekly': weekly_labels,
        }

        # 5. Dynamic Customer Growth
        def calc_growth(days_count):
            start = now - timedelta(days=days_count)
            prev_start = now - timedelta(days=days_count * 2)
            cur = User.objects.filter(date_joined__gte=start).count()
            prev = User.objects.filter(date_joined__gte=prev_start, date_joined__lt=start).count()
            pct = round((cur / max(1, total_users)) * 100)
            if prev > 0:
                diff = round(((cur - prev) / prev) * 100, 1)
                rate = f"+{diff}%" if diff >= 0 else f"{diff}%"
            else:
                rate = f"+{round((cur / max(1, total_users)) * 100, 1)}%"
            return {'percentage': pct, 'growthRate': rate}

        growth_data_map = {
            'Weekly': calc_growth(7),
            'Monthly': calc_growth(30),
            'Yearly': calc_growth(365),
        }

        # 6. Recent activities
        recent_activities = ActivityAuditLog.objects.all().select_related('user').order_by('-created_at')[:100]

        data = {
            'metrics': {
                'total_users': total_users,
                'total_revenue': float(total_revenue),
                'total_video_processed': total_video_processed,
                'total_ai_summary': total_ai_summary,
            },
            'revenue_stats': revenue_data_map.get(requested_timeframe, revenue_data_map) if requested_timeframe else revenue_data_map,
            'all_revenue_stats': revenue_data_map,
            'y_axis_labels': y_axis_map,
            'customer_growth': growth_data_map.get(requested_growth, growth_data_map) if requested_growth else growth_data_map,
            'all_customer_growth': growth_data_map,
            'recent_activities': ActivityAuditLogSerializer(recent_activities, many=True).data,
        }

        if not requested_timeframe and not requested_growth:
            cache.set(DASHBOARD_OVERVIEW_CACHE_KEY, data, DASHBOARD_OVERVIEW_CACHE_TIMEOUT)

        resp = Response(data)
        resp['X-Cache'] = 'MISS'
        resp['Cache-Control'] = 'private, max-age=60, stale-while-revalidate=300'
        return resp


class ActivityAuditLogListView(generics.ListAPIView):
    serializer_class = ActivityAuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = ActivityAuditLog.objects.all().select_related('user').order_by('-created_at')
        plan = self.request.query_params.get('plan')
        search = self.request.query_params.get('search')
        user_id = self.request.query_params.get('user_id')

        if user_id:
            queryset = queryset.filter(user_id=user_id)

        if plan and plan.upper() != 'ALL':
            queryset = queryset.filter(user__plan__iexact=plan)

        if search:
            queryset = queryset.filter(
                Q(user__first_name__icontains=search) |
                Q(user__last_name__icontains=search) |
                Q(user__email__icontains=search) |
                Q(activity_type__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset
