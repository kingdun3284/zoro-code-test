"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionOption } from "./session-option";
import { SessionData } from "@/types/session";

export async function getSession() {
  return await getIronSession<SessionData>(cookies(), SessionOption);
}
export async function destroySession() {
  const session = await getIronSession<SessionData>(cookies(), SessionOption);
  await session.destroy();
}
