import { Query, Resolver } from '@nestjs/graphql'
import { User } from './models/user.model'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, {
    description: 'Get a user by id'
  })
  async me() {
    return {}
  }
}
