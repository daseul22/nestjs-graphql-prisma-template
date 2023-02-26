import { Module } from '@nestjs/common'
import { GraphqlConfigModule } from './third-party/graphql.module'
import { SentryConfigModule } from './third-party/sentry.module'

@Module({
  imports: [SentryConfigModule, GraphqlConfigModule]
})
export class ThirdPartyModule {}
