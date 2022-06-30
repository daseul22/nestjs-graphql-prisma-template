import axios from "axios"
import { Provider } from "../interfaces/provider.interface"

export class GoogleProvider implements Provider {
  private email: string

  getUserEmail(): string {
    return this.email
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/auth/userinfo.profile",
        {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        }
      )
      this.email = data.email

      return true
    } catch (err) {
      return false
    }
  }
}
