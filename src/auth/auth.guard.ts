import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { GqlExecutionContext } from "@nestjs/graphql"
import { Observable } from "rxjs"

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    // console.dir(req, { depth: 0 })
    const role = this.reflector.get<string[]>("role", ctx.getHandler())
    console.log(role)

    return true
  }
}
