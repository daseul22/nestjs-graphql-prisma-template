import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SentryService } from '@ntegral/nestjs-sentry'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  })

  app.useLogger(SentryService.SentryServiceInstance())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  app.use(cookieParser())
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  await app.listen(3000)
}
bootstrap()
