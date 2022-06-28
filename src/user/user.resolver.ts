import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Role } from "src/auth/role.decorator"
import { UserCreateInput } from "./dto/user-create.input"
import { User } from "./models/user.model"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getUser() {
    return {}
  }

  @Role("ADMIN")
  @Query(() => [User])
  async getUsers() {
    const users = await this.userService.getUsers({})
    return users
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: "userCreateInput" })
    userCreateInput: UserCreateInput
  ) {
    const createdUser = await this.userService.createUser({
      ...userCreateInput
    })
    return createdUser
  }
}
