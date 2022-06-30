import { Field, ObjectType, registerEnumType, ID } from "@nestjs/graphql"
import { Post } from "src/post/models/post.model"

export enum IdentityProvider {
  GOOGLE = "GOOGLE",
  KAKAO = "KAKAO",
  APPLE = "APPLE"
}
registerEnumType(IdentityProvider, {
  name: "IdentityProvider",
  description: "Enum은 문자열이 아니라 '' 로 감싸면 안됩니다."
})

export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

registerEnumType(UserGender, {
  name: "UserGender",
  description: "Enum은 문자열이 아니라 '' 로 감싸면 안됩니다."
})

export enum UserPermissionRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

registerEnumType(UserPermissionRole, {
  name: "UserPermissionRole",
  description: "Enum은 문자열이 아니라 '' 로 감싸면 안됩니다."
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
  emailVerified?: Date
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
