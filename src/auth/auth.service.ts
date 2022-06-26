import { Injectable, Logger } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class AuthService {
  private logger: Logger
  constructor(private prisma: PrismaService, private jwtService: JwtService) {
    this.logger = new Logger("AuthService")
  }

  async login(provider, email) {
    return ""
  }
}
