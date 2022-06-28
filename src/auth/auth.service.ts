import { Injectable, Logger } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class AuthService {
  private logger: Logger
  constructor(private prisma: PrismaService, private jwtService: JwtService) {
    this.logger = new Logger("AuthService")
  }

  async oauthLogin(accessToken) {
    // 애플, 카카오, 구글 로그인 유효한지 검증
    // userInfo = validate
    const token = this.jwtService.sign({
      userId: accessToken,
      sInfo: "Sample info"
    })

    return token
  }
}
