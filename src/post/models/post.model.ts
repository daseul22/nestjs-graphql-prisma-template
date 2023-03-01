import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/models/user.model'

@ObjectType()
export class PostResolveFields {
  @Field()
  user: User
}

@ObjectType()
export class Post extends PostResolveFields {
  @Field(() => Int)
  id: number
  @Field()
  title: string
  @Field()
  description?: string
  @Field()
  createdDate: Date
  @Field()
  updatedDate?: Date
}
