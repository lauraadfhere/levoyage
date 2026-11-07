import Link from "next/link";
import { PartnerOnboarding } from "@/components/partner-onboarding";
import { MarketingPage } from "@/components/site-chrome";
export default function PartnerPage() { return <MarketingPage eyebrow="POILIAN PARTNER CENTRE" title="Bring your Algerian business online." intro="Apply to join the marketplace. Verified partners can prepare property drafts and manage booking requests; listings stay offline until moderation approves them."><PartnerOnboarding /><nav className="destination-actions" aria-label="Partner tools"><Link href="/partner/properties">Properties</Link><Link href="/partner/reservations">Reservations</Link><Link href="/partner/studio">360° Studio</Link></nav></MarketingPage>; }
