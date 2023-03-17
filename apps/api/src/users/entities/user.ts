import { BaseEntity } from '@app/common/base/base-entity'
import { addOneMonth } from '@app/common/utils/date.utils'
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Authorize } from '@ptc-org/nestjs-query-graphql'
import { prop } from '@typegoose/typegoose'
import { IsEmail } from 'class-validator'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { defaultPlan, PlanConfig, plansConfig } from '../config/plans.config'
import { UserAuthorizer } from '../resolvers/user.authorizer'

@ObjectType()
@Authorize<User>(UserAuthorizer)
export class User extends BaseEntity {
  @prop({
    required: true,
    unique: true,
    sparse: true, // TODO remove after migration
    validate: isAddress,
    set: (addr) => addr && getAddress(addr),
  })
  address: string

  @Field({ nullable: true })
  @prop({ required: false, trim: true })
  @IsEmail()
  email: string

  @prop({ type: () => [String], default: [] })
  nonces: string[]

  /**
   * whether the user has verified their email
   */
  @prop()
  verified: boolean

  /**
   * the verification token used to verify the user's email
   */
  @prop()
  verificationToken?: string

  @Field(() => Int)
  @prop({ default: 0 })
  operationsUsedMonth: number

  @prop({ default: addOneMonth })
  operationsReset: Date

  @prop({ default: 0 })
  operationsUsedTotal: number

  @Field({ nullable: true })
  @prop()
  plan?: string

  @Field({ nullable: true })
  @prop()
  planPeriodEnds?: Date

  @prop()
  stripeCustomerId?: string

  @prop()
  stripeSubscriptionId?: string

  /**
   * @deprecated
   */
  @Field({ nullable: true })
  @prop()
  name?: string

  @Field({ defaultValue: false })
  @prop()
  subscribedToNotifications?: boolean

  @Field({ defaultValue: false })
  @prop()
  subscribedToNewsletter?: boolean

  @prop()
  flagged?: boolean

  @prop()
  limits?: Record<string, number>

  get planConfig(): PlanConfig {
    return plansConfig[this.plan ?? defaultPlan]
  }
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  subscribedToNotifications?: boolean

  @Field({ nullable: true })
  subscribedToNewsletter?: boolean
}
