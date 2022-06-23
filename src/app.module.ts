import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { UserModule } from "./user/user.module"
import { PrismaModule } from "./prisma/prisma.module"
import { PostModule } from "./post/post.module"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: join(process.cwd(), "src/schema.gql")
    }),
    UserModule,
    PrismaModule,
    PostModule
  ]
})
export class AppModule {}
