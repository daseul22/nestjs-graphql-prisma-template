import { Logger } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Response } from 'express'
import { env } from 'process'
import { AuthService } from './auth.service'
import { OAuthLoginArgs } from './dto/oauth-login.args'
import { OAuthLoginRes } from './dto/oauth-login.res'

export const cookieOptions =
  env.NODE_ENV === 'production' ? { secure: true, httpOnly: true } : {}

@Resolver()
export class AuthResolver {
  private logger: Logger
  constructor(private authService: AuthService) {
    this.logger = new Logger('AuthResolver')
  }

  @Mutation(() => OAuthLoginRes)
  async login(
    @Args() oauthLoginArgs: OAuthLoginArgs,
    @Context('res') res: Response
  ) {
    try {
      await this.authService.oauthLogin(oauthLoginArgs)
      const includesEmail = await this.authService.includesEmailInDatabase()

      if (!includesEmail) {
        const registerToken = this.authService.getRegisterToken()
        res.cookie('registerToken', registerToken, cookieOptions)
        console.log(registerToken)

        return { registerStatus: false }
      }

      const jwt = this.authService.getJwt()
      res.cookie('dallemJwt', jwt, cookieOptions)

      return { registerStatus: true }
    } catch (err) {
      this.logger.error(err)
      return err
    }
  }
}
