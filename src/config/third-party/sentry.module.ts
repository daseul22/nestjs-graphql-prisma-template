import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SentryModule } from '@ntegral/nestjs-sentry'
import { AppConfig } from '../app-config.interface'

@Module({
  imports: [
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<AppConfig>) => {
        return {
          dsn: config.get('SENTRY_DSN'),
          environment: config.get('NODE_ENV'),
          debug: config.get('NODE_ENV') !== 'production',
          tracesSampleRate: 1.0,
          release: (await import('package.json')).default.version,
          logLevels: ['error']
        }
      },
      inject: [ConfigService]
    })
  ]
})
export class SentryConfigModule {}
