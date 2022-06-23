import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { UserCreateInput } from "./input/user-create.input"
import { User } from "./models/user.model"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getUser() {
    return {}
  }

  @Query(() => [User])
  async getUsers() {
    return []
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: "userCreateInput" })
    userCreateInput: UserCreateInput
  ) {
    console.log(userCreateInput)
    const createdUser = await this.userService.createUser({
      ...userCreateInput,
      gender: "MALE",
      role: "ADMIN"
    })
    return {
      ...createdUser
    }
  }

  @Mutation(() => User)
  async updateUser() {
    return {}
  }

  @Mutation(() => User)
  async deleteUser() {
    return {}
  }
}
