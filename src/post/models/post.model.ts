import { Field, ObjectType, ID } from "@nestjs/graphql"
import { User } from "src/user/models/user.model"

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number
  title: string
  description?: string
  createdDate: Date
  updatedDate?: Date
  user: User
}
