import { Logger } from "@nestjs/common"
import { Args, Query, Resolver } from "@nestjs/graphql"
import { AuthService } from "./auth.service"

@Resolver()
export class AuthResolver {
  private logger: Logger
  constructor(private authService: AuthService) {
    this.logger = new Logger("AuthResolver")
  }

  @Query(() => String)
  async login(@Args("data") data: string) {
    try {
      // authService login 호출 해서 data(email, provider)등으로 인증
      //   const token = this.authService.login()
      //   return token
      this.logger.log("I'm Auth login Query")
      return ""
    } catch (err) {
      this.logger.error(err)
      return false
    }
  }
}
