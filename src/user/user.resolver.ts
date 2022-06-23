import { Query, Resolver } from "@nestjs/graphql"
import {
  IdentityProvider,
  User,
  UserGender,
  UserPermissionRole
} from "./models/user.model"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user() {
    console.log(this.userService)

    return {
      id: 1,
      username: "",
      name: "",
      gender: UserGender.MALE,
      phone: "",
      email: "",
      emailVerified: "",
      password: "",
      avatar: "",
      createdDate: new Date("2022-06-23"),
      updatedDate: new Date(),
      identityProvider: IdentityProvider.GOOGLE,
      identityProviderId: "",
      role: UserPermissionRole.ADMIN
    }
  }
}
