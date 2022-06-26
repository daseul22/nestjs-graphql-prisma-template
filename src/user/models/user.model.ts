import { Field, ObjectType, registerEnumType, ID } from "@nestjs/graphql"
import { Post } from "src/post/models/post.model"

export enum IdentityProvider {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  KAKAO = "KAKAO",
  APPLE = "APPLE"
}
registerEnumType(IdentityProvider, {
  name: "IdentityProvider"
})

export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

registerEnumType(UserGender, {
  name: "UserGender"
})

export enum UserPermissionRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

registerEnumType(UserPermissionRole, {
  name: "UserPermissionRole"
})

@ObjectType({
  description:
    "DateTime은 https://docs.nestjs.com/graphql/scalars#override-a-default-scalar 참고"
})
export class User {
  @Field(() => ID)
  id: number
  username?: string
  name: string
  @Field(() => UserGender)
  gender: UserGender
  phone: string
  email: string
  emailVerified?: string
  password?: string
  avatar?: string
  createdDate: Date
  updatedDate?: Date
  @Field(() => IdentityProvider)
  identityProvider: IdentityProvider
  identityProviderId?: string
  @Field(() => UserPermissionRole)
  role: UserPermissionRole
}
