import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "./util/session.util";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const session = await getSession();
    if (!session.isLoggedIn)
      return NextResponse.redirect(new URL("/login", req.url));
  }
  if (req.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
