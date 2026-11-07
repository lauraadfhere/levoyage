import Link from "next/link";
import { ProfileForm } from "@/components/account-forms";
import { DashboardFooter } from "@/components/dashboard-chrome";
import { SiteHeader } from "@/components/site-chrome";

export default function ProfilePage() { return <div className="profile-page"><SiteHeader /><main className="marketing-page"><section className="profile-page-hero"><div className="shell"><Link className="profile-back" href="/dashboard">← Back to My Travel</Link><p className="section-kicker">MY TRAVEL</p><h1>Your traveler profile</h1><p>Manage the name, language and travel preferences shown throughout your Piolian account.</p></div></section><div className="shell page-content"><ProfileForm /></div></main><DashboardFooter /></div>; }
