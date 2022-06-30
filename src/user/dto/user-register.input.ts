import { InputType } from "@nestjs/graphql"
import {
  IdentityProvider,
  UserGender,
  UserPermissionRole
} from "../models/user.model"

@InputType()
export class UserRegisterInput {
  username?: string
  name: string
  gender: UserGender
  phone: string
  email: string
  emailVerified?: string
  password?: string
  avatar?: string
  role: UserPermissionRole
  identityProvider: IdentityProvider
}
