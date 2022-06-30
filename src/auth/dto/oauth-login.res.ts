import { Field, ObjectType } from "@nestjs/graphql"
import { IdentityProvider } from "src/user/models/user.model"

@ObjectType()
export class OAuthLoginRes {
  @Field()
  registerStatus: boolean
}
