import axios from "axios"
import { Provider } from "../interfaces/provider.interface"

export class KakaoProvider implements Provider {
  private email: string

  getUserEmail(): string {
    return this.email
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      const { data } = await axios.get(
        "https://kapi.kakao.com/v2/user/me?secure_resource=true",
        {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        }
      )
      this.email = data.kakao_account.email

      return true
    } catch (err) {
      return false
    }
  }
}
