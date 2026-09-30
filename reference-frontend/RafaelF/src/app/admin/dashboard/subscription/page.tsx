import { redirect } from "next/navigation";

export default function SubscriptionRedirectPage() {
  redirect("/admin/dashboard/subscription-plan");
}
