import {
  Field,
  HideField,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql'
import { Post } from 'src/post/models/post.model'

//  =================== ENUM TYPE ===================
export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
registerEnumType(UserGender, {
  name: 'UserGender'
})

// ==================== OBJECT TYPE ====================
@ObjectType()
export class UserResolveFields {
  posts?: Post[]
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
  updatedDate?: Date
}
