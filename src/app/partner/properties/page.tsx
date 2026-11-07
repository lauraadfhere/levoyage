import Link from "next/link";
import { PartnerProperties } from "@/components/partner-properties";
import { MarketingPage } from "@/components/site-chrome";
export default function PartnerPropertiesPage() { return <MarketingPage eyebrow="PARTNER · PROPERTIES" title="Your property inventory." intro="Create and track listings belonging to your approved tourism business. Drafts remain private until submitted and accepted by platform moderation."><PartnerProperties /><nav className="destination-actions" aria-label="Partner tools"><Link href="/partner">Partner centre</Link><Link href="/partner/reservations">Reservations</Link><Link href="/partner/studio">360° Studio</Link></nav></MarketingPage>; }
