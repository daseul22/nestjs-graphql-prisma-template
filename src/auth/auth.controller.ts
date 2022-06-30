import { Controller, Get, Post, Query } from "@nestjs/common"

@Controller("auth")
export class AuthController {
  @Get("apple")
  async getApple1(@Query() query) {
    console.log("query: ", query)
    console.log("GET APPLE")

    return "IM APPLE GET"
  }

  @Post("apple")
  async getApple2(@Query() query) {
    console.log("query: ", query)
    console.log("POST APPLE")

    return "IM APPLE POST"
  }
}
