import { cookies } from "next/headers";
export const SESSION_COOKIE = "poilian_session";
export async function sessionToken() { return (await cookies()).get(SESSION_COOKIE)?.value; }
