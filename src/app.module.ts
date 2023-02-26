import { Module } from '@nestjs/common'
import { ThirdPartyModule } from './config/third-party.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [ThirdPartyModule, PrismaModule, UserModule]
})
export class AppModule {}
