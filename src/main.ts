import { ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { GqlAuthGuard } from './auth/auth.guard'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true
  //   })
  // )
  app.use(cookieParser())

  // 여기서 새로 new로 PrismaService 생성하면 싱글톤이 아니게 되는거 아닌가?
  app.useGlobalGuards(
    new GqlAuthGuard(new Reflector(), new JwtService(), new PrismaService())
  )
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  await app.listen(3000)
}
bootstrap()
