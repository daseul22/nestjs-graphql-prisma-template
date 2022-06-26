import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { AuthResolver } from "./auth.resolver"
import { env } from "process"

const { JWT_SECRET } = env

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: "1 day"
      }
    })
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}
