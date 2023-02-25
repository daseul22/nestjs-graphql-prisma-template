import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApolloError } from 'apollo-server-express'
import { PrismaService } from 'src/prisma/prisma.service'
import { AppleProvider } from './classes/apple-provider'
import { GoogleProvider } from './classes/google-provider'
import { KakaoProvider } from './classes/kakao-provider'
import { OAuthLoginArgs } from './dto/oauth-login.args'
import { Provider } from './interfaces/provider.interface'

@Injectable()
export class AuthService {
  private userId: number
  private userEmail: string
  private logger: Logger
  private oauthProvider: Provider
  constructor(private prisma: PrismaService, private jwtService: JwtService) {
    this.logger = new Logger('AuthService')
  }

  async oauthLogin({
    identityProvider,
    accessToken
  }: OAuthLoginArgs): Promise<void> {
    switch (identityProvider) {
      case 'GOOGLE':
        this.oauthProvider = new GoogleProvider()
        break
      case 'KAKAO':
        this.oauthProvider = new KakaoProvider()
        break
      case 'APPLE':
        this.oauthProvider = new AppleProvider(new JwtService())
        break
    }

    const isValidAccessToken = await this.oauthProvider.validateAccessToken(
      accessToken
    )
    if (!isValidAccessToken) throw new ApolloError('Invalid AccessToken')
  }

  async includesEmailInDatabase(): Promise<boolean> {
    const providerEmail = this.oauthProvider.getUserEmail()

    const userInfo = await this.prisma.user.findUnique({
      where: {
        email: providerEmail
      }
    })
    if (!userInfo) return false

    this.userId = userInfo.id
    this.userEmail = userInfo.email

    return true
  }

  getJwt(): string {
    const token = this.jwtService.sign({
      id: this.userId,
      email: this.userEmail
    })
    return token
  }

  getRegisterToken(): string {
    const providerEmail = this.oauthProvider.getUserEmail()

    const token = this.jwtService.sign({
      email: providerEmail
    })
    return token
  }
}
