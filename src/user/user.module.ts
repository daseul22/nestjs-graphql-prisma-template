import { Module } from "@nestjs/common"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { env } from "process"

import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

const { JWT_SECRET } = env

@Module({
  imports: [],
  providers: [UserResolver, UserService, JwtService]
})
export class UserModule {}
