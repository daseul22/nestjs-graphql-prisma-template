import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { JwtService } from "@nestjs/jwt"
import { ApolloError } from "apollo-server-express"
import { Request, Response } from "express"
import { env } from "process"
import { GqlContext } from "src/auth/auth.guard"
import { cookieOptions } from "src/auth/auth.resolver"
import { Role } from "src/auth/role.decorator"
import { PrismaService } from "src/prisma/prisma.service"
import { UserRegisterInput } from "./dto/user-register.input"
import { User } from "./models/user.model"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  @Role("USER")
  @Query(() => User)
  async getUser() {
    return {}
  }

  @Role("USER")
  @Query(() => [User])
  async getUsers(@Context() ctx: GqlContext) {
    const users = await this.userService.getUsers({})

    return users
  }

  @Mutation(() => User)
  async registerUser(
    @Args({ name: "userRegisterInput" })
    userRegisterInput: UserRegisterInput,
    @Context("req") req: Request,
    @Context("res") res: Response
  ) {
    try {
      const { registerToken } = req.cookies
      const { email } = this.jwtService.verify(registerToken, {
        secret: env.JWT_SECRET
      })

      console.log("EMAIL : ", email)

      if (userRegisterInput.email !== email) {
        throw new ApolloError(
          "전달받은 email이 registerToken.email과 일치하지 않음"
        )
      }

      const includesUser = await this.prisma.user.findUnique({
        where: {
          email
        }
      })

      if (includesUser) throw new ApolloError("이미 등록된 유저입니다.")

      const createdUser = await this.prisma.user.create({
        data: {
          ...userRegisterInput
        }
      })

      res.clearCookie("registerToken", cookieOptions)

      return createdUser
    } catch (err) {
      throw new ApolloError(err)
    }
  }
}
