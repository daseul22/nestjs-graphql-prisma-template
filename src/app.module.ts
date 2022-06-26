import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { UserModule } from "./user/user.module"
import { PrismaModule } from "./prisma/prisma.module"
import { PostModule } from "./post/post.module"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      installSubscriptionHandlers: true, // webSocket allow
      context: ({ req, res, connection }) => {
        return { req, res, connection }
      },
      buildSchemaOptions: {}
    }),
    UserModule,
    PrismaModule,
    PostModule,
    AuthModule
  ]
})
export class AppModule {}
