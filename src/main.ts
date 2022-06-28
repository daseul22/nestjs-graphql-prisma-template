import { ValidationPipe } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import { AppModule } from "./app.module"
import { GqlAuthGuard } from "./auth/auth.guard"
import { PrismaService } from "./prisma/prisma.service"

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
  app.useGlobalGuards(new GqlAuthGuard(new Reflector()))
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  await app.listen(3000)
}
bootstrap()
