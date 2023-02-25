import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { PostModule } from './post/post.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true, // webSocket allow
      context: ({ req, res, connection }) => {
        // guard에서 getContext하면 이 context를 가져오는거임
        return { req, res, connection }
      },
      buildSchemaOptions: {},
      cors: {
        origin: true,
        credentials: true
      }
    }),
    UserModule,
    PrismaModule,
    PostModule,
    AuthModule
  ]
})
export class AppModule {}
