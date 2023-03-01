import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class UserArgs {
  @Field(() => Int)
  id: number
}
