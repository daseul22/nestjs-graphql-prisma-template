import { InputType } from "@nestjs/graphql"
import { UserGender, UserPermissionRole } from "../models/user.model"

@InputType()
export class UserCreateInput {
  username?: string
  name: string
  gender: UserGender
  phone: string
  email: string
  emailVerified?: string
  password?: string
  avatar?: string
  role: UserPermissionRole
}
