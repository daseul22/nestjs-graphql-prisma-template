import { userIds } from '../auth.guard'

export interface Provider {
  // strategy 패턴을 써야 provider별로 유연하게 만들 수 있으려나..?

  getUserEmail(): string
  validateAccessToken(accessToken: string): Promise<boolean>
}
