from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.creators.models import Creator, CreatorFollow
from apps.briefings.models import Briefing
from apps.library.models import SavedItem
from apps.feedback.models import Feedback
from apps.subscriptions.models import Plan, Subscription, BillingTransaction
from apps.platform_settings.models import PlatformSetting, ContactMessage
from apps.analytics.models import ActivityAuditLog
from apps.accounts.models import Notification

User = get_user_model()



class Command(BaseCommand):
    help = "Seeds initial Curio platform data matching the reference frontend."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Starting data seed for Supabase PostgreSQL..."))

        # 1. Platform Settings
        settings_obj = PlatformSetting.get_settings()
        settings_obj.address = "Dhaka, Bangladesh"
        settings_obj.email = "info@curio.com"
        settings_obj.mobile = "+8801688148194"
        settings_obj.facebook = "CurioAI"
        settings_obj.x_profile = "@CurioAI"
        settings_obj.instagram = "@curio.ai"
        settings_obj.terms_of_use = """Welcome to Curio. By accessing or using our website, applications, and services, you agree to be bound by these Terms of Use.
1. Account Registration & Security: Users must provide accurate credentials.
2. Content & Fair Usage: Curio converts YouTube content into smart audio briefings for personal informational use.
3. Subscription & Billing: Monthly and Yearly plans provide premium audio generation."""
        settings_obj.privacy_policy = """At Curio, your privacy is a paramount priority.
1. Information We Collect: Name, email address, listening preferences.
2. How We Use Information: To deliver generated audio summaries and personal feeds."""
        settings_obj.save()
        self.stdout.write(self.style.SUCCESS("[OK] Platform settings created/updated."))

        # 2. Subscription Plans
        plans_data = [
            {
                "name": "Free",
                "slug": "free",
                "price": 0.00,
                "currency": "$",
                "period": "/forever",
                "billing_cycle": "forever",
                "badge_text": "Basic",
                "is_popular": False,
                "is_best_offer": False,
                "features": [
                    "Up to 5 video summaries / week",
                    "Standard length text recaps",
                    "Follow up to 3 YouTube creators",
                    "Web access only",
                    "Community support",
                ],
                "free_trial_days": 0,
            },
            {
                "name": "Pro",
                "slug": "pro",
                "price": 12.00,
                "currency": "$",
                "period": "/per month",
                "billing_cycle": "monthly",
                "badge_text": "Most Popular",
                "is_popular": True,
                "is_best_offer": True,
                "features": [
                    "Unlimited video summaries",
                    "HD audio briefings with realistic AI voices",
                    "Follow unlimited YouTube creators",
                    "Personalized daily digest feed",
                    "Download audio briefings offline",
                ],
                "free_trial_days": 3,
            },
            {
                "name": "Enterprise",
                "slug": "enterprise",
                "price": 80.00,
                "currency": "$",
                "period": "/per year",
                "billing_cycle": "yearly",
                "badge_text": "Team",
                "is_popular": False,
                "is_best_offer": False,
                "features": [
                    "Everything in Pro included",
                    "Multi-seat team workspace (up to 10)",
                    "Automated Slack & Notion integration",
                    "API & Webhook export options",
                    "Dedicated account manager",
                ],
                "free_trial_days": 7,
            },
        ]

        created_plans = {}
        for p in plans_data:
            plan_obj, _ = Plan.objects.update_or_create(
                slug=p["slug"],
                defaults=p
            )
            created_plans[p["slug"]] = plan_obj
        self.stdout.write(self.style.SUCCESS("[OK] Subscription plans created/updated."))

        # 3. Users (Admin & Demo Member)
        admin_user, _ = User.objects.get_or_create(
            email="admin@curio.ai",
            defaults={
                "first_name": "Abir",
                "last_name": "Hossain",
                "role": "admin",
                "plan": "Enterprise",
                "company": "Curio AI Inc.",
                "position": "Lead Administrator",
                "phone": "+8801700000000",
                "address": "Dhaka, Bangladesh",
                "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
                "is_staff": True,
                "is_superuser": True,
            }
        )
        admin_user.set_password("admin123456")
        admin_user.save()

        demo_user, _ = User.objects.get_or_create(
            email="abir07@gmail.com",
            defaults={
                "first_name": "Abir",
                "last_name": "Hossain",
                "role": "user",
                "plan": "Pro",
                "company": "Orange Ltd",
                "position": "Product Manager",
                "phone": "01498978089049",
                "address": "Dhaka, Bangladesh",
                "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
            }
        )
        demo_user.set_password("user123456")
        demo_user.save()

        # Seed sample members for Admin dashboard
        sample_users = [
            ("sarah.j@gmail.com", "Sarah", "Johnson", "Pro"),
            ("alex.r@gmail.com", "Alex", "Rivera", "Enterprise"),
            ("david.c@gmail.com", "David", "Chen", "Free"),
            ("emma.w@gmail.com", "Emma", "Watson", "Pro"),
            ("michael.b@gmail.com", "Michael", "Brown", "Pro"),
            ("sophia.t@gmail.com", "Sophia", "Taylor", "Enterprise"),
            ("james.w@gmail.com", "James", "Wilson", "Free"),
        ]
        for email, fn, ln, plan_name in sample_users:
            u, _ = User.objects.get_or_create(
                email=email,
                defaults={
                    "first_name": fn,
                    "last_name": ln,
                    "plan": plan_name,
                    "role": "user",
                }
            )
            u.set_password("sample123")
            u.save()

        self.stdout.write(self.style.SUCCESS("[OK] Admin and sample users created."))

        # 4. Creators
        creators_data = [
            {
                "name": "Motiversity",
                "handle": "@motiversity",
                "channel_url": "https://youtube.com/@motiversity",
                "avatar_url": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
                "initials": "M",
                "avatar_gradient": "from-purple-600 to-indigo-600",
                "description": "Daily powerful motivational speeches, discipline mastery, and interviews with world-class performers.",
                "video_count": 142,
                "subscriber_count": "4.11M subscribers",
            },
            {
                "name": "Huberman Lab",
                "handle": "@hubermanlab",
                "channel_url": "https://youtube.com/@hubermanlab",
                "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                "initials": "HL",
                "avatar_gradient": "from-blue-600 to-cyan-600",
                "description": "Neuroscience and science-backed protocols for everyday health, sleep optimization, and cognitive focus.",
                "video_count": 190,
                "subscriber_count": "5.82M subscribers",
            },
            {
                "name": "Lex Fridman",
                "handle": "@lexfridman",
                "channel_url": "https://youtube.com/@lexfridman",
                "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
                "initials": "LF",
                "avatar_gradient": "from-zinc-700 to-zinc-900",
                "description": "Conversations on AI, science, technology, history, philosophy, intelligence, and consciousness.",
                "video_count": 430,
                "subscriber_count": "4.29M subscribers",
            },
            {
                "name": "Ali Abdaal",
                "handle": "@aliabdaal",
                "channel_url": "https://youtube.com/@aliabdaal",
                "avatar_url": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
                "initials": "AA",
                "avatar_gradient": "from-emerald-500 to-teal-700",
                "description": "Evidence-based productivity frameworks, book breakdowns, and actionable tools for life.",
                "video_count": 610,
                "subscriber_count": "5.45M subscribers",
            },
            {
                "name": "Veritasium",
                "handle": "@veritasium",
                "channel_url": "https://youtube.com/@veritasium",
                "avatar_url": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
                "initials": "V",
                "avatar_gradient": "from-amber-600 to-orange-700",
                "description": "An element of truth: deep-dive science videos, physics demonstrations, and thought experiments.",
                "video_count": 390,
                "subscriber_count": "16.3M subscribers",
            },
            {
                "name": "Tech Insights",
                "handle": "@techinsights",
                "channel_url": "https://youtube.com/@techinsights",
                "avatar_url": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
                "initials": "TI",
                "avatar_gradient": "bg-gradient-to-tr from-cyan-500 to-blue-600",
                "description": "AI, technology trends, and future innovations. Exploring how innovation is reshaping industries.",
                "video_count": 24,
                "subscriber_count": "2.4M subscribers",
            },
            {
                "name": "TED Talks",
                "handle": "@tedtalks",
                "channel_url": "https://youtube.com/@tedtalks",
                "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                "initials": "TED",
                "avatar_gradient": "from-red-600 to-rose-700",
                "description": "Ideas worth spreading: cutting-edge talks from global leaders on science and human potential.",
                "video_count": 3800,
                "subscriber_count": "24.1M subscribers",
            },
        ]

        created_creators = {}
        for c in creators_data:
            c_obj, _ = Creator.objects.update_or_create(
                handle=c["handle"],
                defaults=c
            )
            created_creators[c["name"]] = c_obj
            # Demo user follows all creators
            CreatorFollow.objects.get_or_create(user=demo_user, creator=c_obj)
        self.stdout.write(self.style.SUCCESS("[OK] Creators created and followed."))

        # 5. Briefings (All 12 from Feed)
        briefings_data = [
            {
                "creator": created_creators.get("Motiversity"),
                "title": "YOU OWE IT TO YOU IN 2026 - Best Motivational Speech | Matthew McConaughey",
                "duration": "08:25",
                "thumbnail_url": "/images/summary.png",
                "summary": "This motivational speech emphasizes taking full responsibility for your life, defining your personal metrics for success, and embracing continuous self-discipline over temporary motivation.",
                "full_summary": "Matthew McConaughey deconstructs the paradox of modern achievement. The speech urges individuals to eliminate distractions, define internal success benchmarks rather than peer validation, and understand that consistent daily commitments compound into undeniable long-term destiny.",
                "key_takeaways": [
                    "Define what success means to you before society defines it for you.",
                    "Eliminate toxic people, habits, and cognitive traps that drain momentum.",
                    "The compound effect of 1% disciplined daily progress outperforms sporadic intense effort.",
                ],
                "timeframe": "daily",
                "category": "Motivation",
            },
            {
                "creator": created_creators.get("Huberman Lab"),
                "title": "Optimize Your Dopamine for Focus, Motivation & Drive | Dr. Andrew Huberman",
                "duration": "14:10",
                "thumbnail_url": "/images/audio.png",
                "summary": "Understand how dopamine drives energy, focus, and state of mind. Learn neurobiology-backed protocols to maintain consistent drive without burning out your baseline.",
                "full_summary": "Dr. Huberman explains the neurochemical mechanics of dopamine peaks versus dopamine troughs. Layering artificial stimuli during deep work can deplete baseline dopamine, leading to severe procrastination later.",
                "key_takeaways": [
                    "Avoid stacking too many dopamine spikes simultaneously during routine work.",
                    "Engage with effort as the reward to build psychological resilience.",
                    "Intermittent reward schedules are the most effective way to sustain lifelong motivation.",
                ],
                "timeframe": "daily",
                "category": "Health",
            },
            {
                "creator": created_creators.get("Lex Fridman"),
                "title": "Demis Hassabis: Future of AI, Gemini 3, AlphaFold & AGI Timeline",
                "duration": "21:40",
                "thumbnail_url": "/images/analysis.png",
                "summary": "Google DeepMind CEO Demis Hassabis shares breakthroughs in agentic reasoning, biological simulations, and the convergence towards human-level intelligence.",
                "full_summary": "An in-depth conversation covering the transition from narrow pattern recognition models to autonomous multi-step reasoning agents.",
                "key_takeaways": [
                    "Multi-modal reasoning with built-in search and verification is the new frontier.",
                    "AI in drug discovery and molecular biology will advance medicine by decades.",
                    "Autonomous coding agents will redefine software engineering into system architecture.",
                ],
                "timeframe": "daily",
                "category": "AI",
            },
            {
                "creator": created_creators.get("Ali Abdaal"),
                "title": "How to Build a Second Brain in 2026 (Full Productivity Workflow)",
                "duration": "11:15",
                "thumbnail_url": "/images/feed.png",
                "summary": "A complete system to capture ideas, summarize YouTube lectures automatically, and build an evergreen digital library that produces high-value creative output.",
                "full_summary": "Ali showcases practical knowledge management using automated AI summaries. Instead of hoarding bookmarks, structured daily briefs allow creators to retrieve actionable insights in seconds.",
                "key_takeaways": [
                    "Capture only what resonates emotionally or logically.",
                    "Organize by actionability, not by topic.",
                    "Express knowledge into tangible outputs (briefs, notes, decisions).",
                ],
                "timeframe": "daily",
                "category": "Productivity",
            },
            {
                "creator": created_creators.get("Veritasium"),
                "title": "The Bizarre Physics of Why You Can't Touch Anything | Veritasium",
                "duration": "12:50",
                "thumbnail_url": "/images/hero.png",
                "summary": "At the atomic scale, electrostatic repulsion and quantum degeneracy pressure prevent electron clouds from ever truly making contact.",
                "full_summary": "Derek Muller explores quantum mechanics and electromagnetic forces to demonstrate that tactile sensation is purely electrostatic repulsion.",
                "key_takeaways": [
                    "Pauli exclusion principle dictates fermion behavior in matter.",
                    "The sensation of solid touch is electromagnetic pushback.",
                    "Every physical interaction is fundamentally a non-contact field interaction.",
                ],
                "timeframe": "daily",
                "category": "Science",
            },
            {
                "creator": created_creators.get("TED Talks"),
                "title": "How Great Leaders Inspire Action & Build Unstoppable Momentum",
                "duration": "09:35",
                "thumbnail_url": "/images/creators.png",
                "summary": "Discover the Golden Circle framework: people don't buy what you do; they buy why you do it. Transforming products into movements.",
                "full_summary": "A timeless dissection of visionary communication. Leaders who inspire loyalty communicate from the inside out.",
                "key_takeaways": [
                    "Clarify your purpose before executing tactical features.",
                    "True leadership is based on inspiring voluntary commitment rather than coercion.",
                    "Authenticity in brand messaging creates resilient user loyalty.",
                ],
                "timeframe": "daily",
                "category": "Leadership",
            },
            {
                "creator": created_creators.get("Tech Insights"),
                "title": "The Architecture of Large Language Models: From Attention to AGI",
                "duration": "18:45",
                "thumbnail_url": "/images/server_room.png",
                "summary": "A comprehensive walkthrough of transformer mechanics, next-token prediction, inference compute scaling, and post-training alignment techniques.",
                "full_summary": "Andrej Karpathy walks through the fundamentals of modern foundation models.",
                "key_takeaways": [
                    "Attention mechanisms allow unbounded contextual cross-referencing.",
                    "Inference-time search scales reasoning beyond static weight memorization.",
                    "Reinforcement learning from verifiable rewards is key for rigorous math and code.",
                ],
                "timeframe": "weekly",
                "category": "Technology",
            },
        ]

        created_briefings = []
        for b in briefings_data:
            briefing_obj, _ = Briefing.objects.update_or_create(
                title=b["title"],
                defaults=b
            )
            created_briefings.append(briefing_obj)

        # Seed Saved Library for Demo user
        for br in created_briefings[:4]:
            SavedItem.objects.get_or_create(user=demo_user, briefing=br)
        self.stdout.write(self.style.SUCCESS("[OK] Briefings and saved library items created."))

        # 6. Feedback & Reviews
        reviews_data = [
            {
                "user": demo_user,
                "briefing": created_briefings[0] if created_briefings else None,
                "rating": 5,
                "useful_feedback": "Accurate and concise",
                "thoughts": "I used to spend hours watching long YouTube videos. With Curio, I can get the key takeaways in minutes. The AI-generated audio briefings are clear, accurate, and incredibly helpful for staying informed on the go.",
                "is_platform_review": True,
                "is_featured": True,
                "subtitle": "Curio Changed the Way I Consume Content!",
                "summary_tag": "Great summary",
                "better_version_tag": "Generate a better version",
            },
            {
                "user": User.objects.filter(email="sarah.j@gmail.com").first() or demo_user,
                "briefing": created_briefings[1] if len(created_briefings) > 1 else None,
                "rating": 5,
                "useful_feedback": "Very clear",
                "thoughts": "My Go-To Tool for Learning! High quality audio briefings that save me hours every single day.",
                "is_platform_review": True,
                "is_featured": True,
                "subtitle": "My Go-To Tool for Learning!",
                "summary_tag": "Actionable advice",
                "better_version_tag": "Generate a better version",
            },
        ]

        for rev in reviews_data:
            Feedback.objects.get_or_create(
                user=rev["user"],
                subtitle=rev.get("subtitle", ""),
                defaults=rev
            )
        self.stdout.write(self.style.SUCCESS("[OK] Feedback reviews created."))

        # 7. Activity Audit Logs
        activities = [
            (demo_user, "New User Registered", "Abir Hossain joined as Pro member", None),
            (User.objects.filter(email="alex.r@gmail.com").first() or demo_user, "Video Processed", "AI Trends 2026.mp4 completed", None),
            (User.objects.filter(email="david.c@gmail.com").first() or demo_user, "Audio Played", "Morning Briefing audio played", None),
            (User.objects.filter(email="emma.w@gmail.com").first() or demo_user, "Platform Review 4/5", "Added a review about the platform", 4),
            (User.objects.filter(email="michael.b@gmail.com").first() or demo_user, "Subscription Upgrade", "Free to Pro plan upgraded", None),
            (User.objects.filter(email="sophia.t@gmail.com").first() or demo_user, "Added to Library", "Motive pro video was added to library", None),
            (User.objects.filter(email="james.w@gmail.com").first() or demo_user, "Download", "Motive pro video was downloaded", None),
        ]
        for usr, act_type, desc, rtg in activities:
            ActivityAuditLog.objects.create(
                user=usr,
                activity_type=act_type,
                description=desc,
                rating=rtg
            )
        self.stdout.write(self.style.SUCCESS("[OK] Activity audit logs created."))

        # 8. Notifications (matching NotificationModal)
        notifications_data = [
            {
                "title": "Burkina Faso Briefing Available",
                "body": "This motivational speech emphasizes taking full responsibility for your life and future.",
                "avatar_url": "/images/happy_user.png",
                "is_read": False,
            },
            {
                "title": "New Tech Insights Summary",
                "body": "AI Trends & Autonomous Agents: Exploring breakthrough architectures in 2026.",
                "avatar_url": "/images/summary.png",
                "is_read": False,
            },
            {
                "title": "Huberman Lab Focus Protocols",
                "body": "Science-backed tools to optimize focus, cognitive stamina, and productivity.",
                "avatar_url": "/images/happy_user.png",
                "is_read": True,
            },
            {
                "title": "Weekly Recap Ready",
                "body": "Your weekly digest of 12 top creator videos has been synthesized into a 5-minute audio briefing.",
                "avatar_url": "/images/summary.png",
                "is_read": True,
            },
        ]
        for notif in notifications_data:
            Notification.objects.get_or_create(
                user=demo_user,
                title=notif["title"],
                defaults=notif
            )
            # Also create a global one
            Notification.objects.get_or_create(
                user=None,
                title=notif["title"],
                defaults=notif
            )
        self.stdout.write(self.style.SUCCESS("[OK] Notifications created."))

        # 9. Contact Messages
        contact_messages_data = [
            {
                "name": "Alex Rivera",
                "email": "alex.r@gmail.com",
                "subject": "Enterprise Plan Inquiry",
                "message": "We are looking to onboard 45 team members. Can we arrange a customized team demo?",
                "is_resolved": False,
            },
            {
                "name": "Sarah Johnson",
                "email": "sarah.j@gmail.com",
                "subject": "Audio Export Feature",
                "message": "Loved the audio summaries! Is it possible to add direct RSS feed sync to podcast players?",
                "is_resolved": True,
            },
        ]
        for msg in contact_messages_data:
            ContactMessage.objects.get_or_create(
                email=msg["email"],
                subject=msg["subject"],
                defaults=msg
            )
        self.stdout.write(self.style.SUCCESS("[OK] Contact inquiries created."))

        # 10. Billing Transactions for Demo User (matching user-details purchase history)
        pro_plan = Plan.objects.filter(slug="pro").first()
        enterprise_plan = Plan.objects.filter(slug="enterprise").first()
        transactions_data = [
            (demo_user, pro_plan, 12.00, "visa", "2585"),
            (demo_user, enterprise_plan, 12.00, "mastercard", "3490"),
            (demo_user, pro_plan, 12.00, "visa", "1245"),
        ]
        for u, p, amt, brand, l4 in transactions_data:
            BillingTransaction.objects.get_or_create(
                user=u,
                plan=p,
                card_last4=l4,
                defaults={
                    "first_name": u.first_name,
                    "last_name": u.last_name,
                    "email": u.email,
                    "address": u.address or "Dhaka, Bangladesh",
                    "card_brand": brand,
                    "amount": amt,
                    "currency": "$",
                    "is_success": True
                }
            )
        self.stdout.write(self.style.SUCCESS("[OK] User billing transactions created."))

        self.stdout.write(self.style.SUCCESS("\n*** Supabase database seeding completed successfully! ***"))

