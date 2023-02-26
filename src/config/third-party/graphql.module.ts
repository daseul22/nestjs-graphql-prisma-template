import path from 'node:path'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true, // webSocket allow
      context: ({ req, res, connection }) => {
        return { req, res, connection }
      },
      buildSchemaOptions: {},
      cors: {
        origin: true,
        credentials: true
      }
    })
  ]
})
export class GraphqlConfigModule {}
