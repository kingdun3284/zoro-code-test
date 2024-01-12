import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { hash, verify } from "argon2";
import { randomUUID } from "crypto";
@Entity()
export class User {
  @PrimaryKey()
  id: string = randomUUID();

  @Property()
  username!: string;

  @Property({ lazy: true, nullable: true })
  password?: string;

  @Property()
  prefferedName?: string;

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password);
  }
  async verifyPassword(password: string) {
    if (this.password) return await verify(this.password, password);
    else throw new Error("Password is not populated");
  }
}
