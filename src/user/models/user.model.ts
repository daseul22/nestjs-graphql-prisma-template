import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';

export enum IdentityProvider {
  EMAIL,
  GOOGLE,
  KAKAO,
  APPLE,
}

registerEnumType(IdentityProvider, {
  name: 'IdentityProvider',
});

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
}
