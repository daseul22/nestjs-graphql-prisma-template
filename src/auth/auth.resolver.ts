import { Logger } from "@nestjs/common"
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"
import { Request, Response } from "express"
import { AuthService } from "./auth.service"

@Resolver()
export class AuthResolver {
  private logger: Logger
  constructor(private authService: AuthService) {
    this.logger = new Logger("AuthResolver")
  }

  @Mutation(() => String)
  async login(
    @Args("data") data: string,
    @Context("req") req: Request,
    @Context("res") res: Response
  ) {
    try {
      // authService login 호출 해서 data(email, provider)등으로 인증
      const token = await this.authService.oauthLogin(data)
      res.cookie("jwt", token)

      return "login success"
    } catch (err) {
      this.logger.error(err)
      return false
    }
  }
}
