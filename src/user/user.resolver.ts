import { BadRequestException } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Post } from 'src/post/models/post.model'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserArgs } from './dto/user.args'
import { User } from './models/user.model'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService
  ) {}

  // ==================== Query ====================
  @Query(() => User)
  async user(@Args() { id }: UserArgs) {
    try {
      const user = this.userService.user(id)

      return user
    } catch (err) {
      console.log(err)
      throw new BadRequestException(err.message)
    }
  }

  // ==================== ResolveFiled ====================
  @ResolveField(() => [Post], {
    nullable: true
  })
  async posts(@Parent() user: User) {
    try {
      const posts = this.prisma.user
        .findUnique({ where: { id: user.id } })
        .posts()

      return posts
    } catch (err) {
      console.log(err)
      throw new BadRequestException(err.message)
    }
  }

  // ==================== Mutation ====================
}
