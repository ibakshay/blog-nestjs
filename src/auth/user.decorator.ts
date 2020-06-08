import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common'

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return req.user

})