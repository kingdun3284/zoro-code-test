import { User } from "@/entities/user.entity";
import { getAjvInstance } from "@/util/ajv.util";
import { getEM } from "@/util/orm";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SessionData } from "@/types/session";
import { SessionOption } from "@/util/session-option";
export async function POST(req: Request) {
  const body = await req.json();
  const validate = getAjvInstance().compile({
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
    required: ["username", "password"],
  });
  if (validate(body)) {
  } else {
    return NextResponse.json(
      { message: "Invalid request body", errors: validate.errors },
      { status: 400 }
    );
  }
  const em = await getEM();
  const user = await em.findOne(
    User,
    { username: body.username },
    { populate: ["password"] }
  );
  const usernameOrPasswordIncorrect = NextResponse.json(
    { message: "Username or password is incorrect" },
    { status: 400 }
  );
  if (!user) return usernameOrPasswordIncorrect;
  if (!(await user.verifyPassword(body.password)))
    return usernameOrPasswordIncorrect;

  const session = await getIronSession<SessionData>(cookies(), SessionOption);
  session.id = user.id;
  session.isLoggedIn = true;
  await session.save();

  return NextResponse.json(session, { status: 200 });
}
