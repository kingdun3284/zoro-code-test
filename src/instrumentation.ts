import { User } from "./entities/user.entity";
import { getEM } from "./util/orm";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation-node");
    // const em = await getEM();
    // const testUser = em.create(User, {
    //   username: "username",
    //   password: "password",
    // });
    // await em.persistAndFlush(testUser);
  }
}
