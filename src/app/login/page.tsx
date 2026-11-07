import Link from "next/link";
import Image from "next/image";
import { AuthForm } from "@/components/account-forms";
import { AuthLanguageSwitch } from "@/components/auth-language-switch";
export default function LoginPage() { const year = new Date().getFullYear(); return <main className="account-page"><header className="account-header"><Link href="/" aria-label="Veyyri home"><Image src="/veyyri.png" alt="Veyyri" width={304} height={110} priority /></Link><AuthLanguageSwitch page="login" /></header><section className="account-panel"><h1>Sign in to My Travel</h1><p>Access your Algeria trips, saved offers and traveler profile.</p><AuthForm mode="login" /><p className="account-help">New to Poilian? <Link href="/signup">Create an account</Link></p><footer>By signing in, you agree with our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Statement</Link>.</footer></section><p className="account-copyright">© {year} Piolian · Algeria Travel Platform</p></main>; }
