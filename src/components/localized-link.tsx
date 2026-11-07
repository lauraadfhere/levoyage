"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { localizedPath } from "@/components/locale-switcher";
type Props = ComponentProps<typeof Link> & { href: string };
export function LocalizedLink({ href, ...props }: Props) { const pathname = usePathname(); const segment = pathname.split("/")[1]; const locale = ["en", "fr", "ar"].includes(segment) ? segment as "en" | "fr" | "ar" : "en"; return <Link href={localizedPath(href, locale)} {...props} />; }
