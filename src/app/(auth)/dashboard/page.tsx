import Button from "@/components/button";
import { User } from "@/entities/user.entity";
import { getEM } from "@/util/orm";
import { destroySession, getSession } from "@/util/session.util";
import { redirect, useRouter } from "next/navigation";

async function logout() {
  "use server";
  await destroySession();
  redirect("/");
}

async function getUserInfo() {
  "use server";
  const session = await getSession();
  const em = await getEM();
  const user = await em.findOne(User, { id: session.id });
  return user;
}
export default async function Page() {
  const user = await getUserInfo();
  return (
    <div>
      <div className="greetings">Welcome {user?.prefferedName} !</div>
      {user ? (
        <form action={logout}>
          <Button type="submit">Logout</Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
