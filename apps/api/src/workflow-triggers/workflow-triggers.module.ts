import { NestjsQueryTypegooseModule } from '@app/common/NestjsQueryTypegooseModule'
import { forwardRef, Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql'
import { DefinitionsModule } from '../../../../libs/definitions/src'
import { RunnerModule } from '../../../runner/src/runner.module'
import { AccountCredentialsModule } from '../account-credentials/account-credentials.module'
import { AuthModule } from '../auth/auth.module'
import { IntegrationTriggersModule } from '../integration-triggers/integration-triggers.module'
import { IntegrationsModule } from '../integrations/integrations.module'
import { UsersModule } from '../users/users.module'
import { WorkflowActionsModule } from '../workflow-actions/workflow-actions.module'
import { WorkflowRunsModule } from '../workflow-runs/workflow-runs.module'
import { WorkflowsModule } from '../workflows/workflows.module'
import { HooksController } from './controllers/hooks.controller'
import { WorkflowTrigger } from './entities/workflow-trigger'
import { WorkflowTriggerAuthorizer, WorkflowTriggerResolver } from './resolvers/workflow-trigger.resolver'
import { WorkflowTriggerService } from './services/workflow-trigger.service'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([WorkflowTrigger])],
      dtos: [{ DTOClass: WorkflowTrigger }],
    }),
    AuthModule,
    UsersModule, // required for GraphqlGuard
    IntegrationsModule,
    IntegrationTriggersModule,
    forwardRef(() => AccountCredentialsModule),
    WorkflowsModule,
    forwardRef(() => WorkflowActionsModule),
    forwardRef(() => WorkflowRunsModule),
    DefinitionsModule,

    // TODO remove forwardRef once Runner calls are replaced with queues
    forwardRef(() => RunnerModule),
  ],
  providers: [WorkflowTriggerResolver, WorkflowTriggerService, WorkflowTriggerAuthorizer],
  exports: [WorkflowTriggerService],
  controllers: [HooksController],
})
export class WorkflowTriggersModule {}
