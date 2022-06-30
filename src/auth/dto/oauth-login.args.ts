import { ArgsType } from "@nestjs/graphql"
import { IdentityProvider } from "src/user/models/user.model"

@ArgsType()
export class OAuthLoginArgs {
  identityProvider: IdentityProvider
  accessToken: string
}
