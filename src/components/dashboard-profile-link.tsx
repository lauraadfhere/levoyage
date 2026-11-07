"use client";
import { LocalizedLink as Link } from "@/components/localized-link";
import { useEffect, useState } from "react";
type Account = { fullName: string };
export function DashboardProfileLink() { const [account, setAccount] = useState<Account>({ fullName: "Demo Traveler" }); useEffect(() => { const loadAccount = () => fetch("/api/auth/profile").then(async response => { if (response.ok) setAccount(await response.json()); }).catch(() => undefined); loadAccount(); window.addEventListener("account-profile-updated", loadAccount); return () => window.removeEventListener("account-profile-updated", loadAccount); }, []); const initials = account.fullName.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase(); return <Link className="profile" href="/profile"><span className="avatar">{initials}</span><span><strong>{account.fullName}</strong><small>Algeria Traveller</small></span></Link>; }
