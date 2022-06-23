import { Mutation, Query, Resolver } from "@nestjs/graphql"
import { Post } from "./models/post.model"
import { PostService } from "./post.service"

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => Post)
  async getPost() {
    return {}
  }

  @Query(() => [Post])
  async getPosts() {
    return []
  }

  @Mutation(() => Post)
  async createPost() {
    return {}
  }

  @Mutation(() => Post)
  async updatePost() {
    return {}
  }

  @Mutation(() => Post)
  async deletePost() {
    return {}
  }
}
