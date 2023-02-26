export interface AppConfig {
  NODE_ENV: 'development' | 'production'
  DATABASE_URL: string
  JWT_SECRET: string

  SENTRY_DSN: string
}
