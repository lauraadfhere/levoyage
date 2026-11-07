import { PartnerReview } from "@/components/partner-review";
import { PropertyReview } from "@/components/property-review";
import { ReviewModeration } from "@/components/review-moderation";
import { MarketingPage } from "@/components/site-chrome";
export default function AdminPage() { return <MarketingPage eyebrow="ADMIN SYSTEM" title="Control the tourism ecosystem." intro="Review partner applications and property submissions before any business or listing is shown as approved. All moderation actions require an administrator account."><div className="admin-review-workspace"><PartnerReview /><PropertyReview /><ReviewModeration /></div></MarketingPage>; }
