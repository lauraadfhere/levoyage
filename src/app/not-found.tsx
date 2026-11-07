import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function NotFound() {
  return <><SiteHeader /><main className="not-found-page"><section className="not-found-card"><div className="not-found-copy"><p className="section-kicker">LOST ON THE ROUTE</p><h1>404</h1><h2>This destination is off the map.</h2><p>The page may have moved, or the route may not exist yet. Let’s get you back to the places worth exploring.</p><Link href="/">Return home</Link></div><div className="not-found-art" aria-hidden="true"><div className="robot-head"><i /><i /></div><div className="robot-body"><span /></div><div className="robot-arm arm-left" /><div className="robot-arm arm-right" /><div className="robot-track" /><b className="robot-spark spark-one" /> <b className="robot-spark spark-two" /> <b className="robot-spark spark-three" /></div></section></main><SiteFooter /></>;
}
