import { User } from "./entities/user.entity";
import { getORM } from "./util/orm";

async function main() {
  const orm = await getORM();
  await orm.getSchemaGenerator().dropSchema({ wrap: false });
  await orm.getSchemaGenerator().updateSchema({ wrap: false });
  const em = orm.em.fork();
  const user = await em.create(User, {
    username: "username",
    password: "password",
    prefferedName: "John",
  });
  await em.persistAndFlush(user);
}
main();
