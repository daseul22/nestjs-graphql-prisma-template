import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { AuthGuard } from "src/auth/auth.guard"
import { Role } from "src/auth/role.decorator"
import { UserCreateInput } from "./input-types/user-create.input"
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
  @UseGuards(AuthGuard)
  @Role("ADMIN")
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
