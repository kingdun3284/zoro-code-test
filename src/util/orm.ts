import { User } from "@/entities/user.entity";
import { MikroORM } from "@mikro-orm/core";

let orm: MikroORM;
export const getORM = async () => {
  if (!orm) {
    orm = await MikroORM.init({
      entities: [User],
      dbName: "test.sqlite",
      type: "sqlite",
    });
  }
  return orm;
};

export const getEM = async () => {
  return (await getORM()).em.fork();
};
