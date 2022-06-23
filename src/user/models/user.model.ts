import { Field, ObjectType, registerEnumType, ID } from "@nestjs/graphql"

export enum IdentityProvider {
  EMAIL,
  GOOGLE,
  KAKAO,
  APPLE
}
registerEnumType(IdentityProvider, {
  name: "IdentityProvider"
})

export enum UserGender {
  MALE,
  FEMALE
}

registerEnumType(UserGender, {
  name: "UserGender"
})

export enum UserPermissionRole {
  USER,
  ADMIN
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
