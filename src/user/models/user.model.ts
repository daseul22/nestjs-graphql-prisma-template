import {
  Field,
  HideField,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql'

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
registerEnumType(UserGender, {
  name: 'UserGender'
})

@ObjectType()
export class UserResolveFields {
  //   posts?: Post[]
}

@ObjectType()
export class User extends UserResolveFields {
  @Field(() => Int)
  id: number
  @Field()
  username?: string
  @Field()
  name: string
  @Field()
  gender: UserGender
  @Field()
  phone: string
  @Field()
  email: string
  @HideField()
  password: string
  @Field()
  avatar?: string
  @Field()
  createdDate: Date
  @Field()
  updatedDate: Date
}
