import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { GqlExecutionContext } from "@nestjs/graphql"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"
import { Request, Response } from "express"
import { env } from "process"
import { Observable } from "rxjs"
import { PrismaService } from "src/prisma/prisma.service"

export interface userIds {
  id: number
  email: string
}

export interface GqlContext {
  user?: User
  req: Request
  res: Response
  connection?: any
}

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context)
      const gqlContext: GqlContext = ctx.getContext()
      const { req } = gqlContext

      const role = this.reflector.get<string[]>("role", ctx.getHandler())
      console.log("role : ", role)
      console.log("cookies :", req.cookies)
      if (!role) return true

      const { dallemJwt } = req.cookies
      const { email } = this.jwtService.verify<userIds>(dallemJwt, {
        secret: env.JWT_SECRET
      })
      const userInfo = await this.prisma.user.findUnique({
        where: {
          email
        }
      })
      gqlContext.user = userInfo

      return true
    } catch (err) {
      console.log("Invalid dallemJwt")
      console.log(err)
      return false
    }
  }
}
