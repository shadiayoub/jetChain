import { DefinitionsModule } from '@app/definitions'
import { Test, TestingModule } from '@nestjs/testing'
import { RunnerModule } from 'apps/runner/src/runner.module'
import { AuthModule } from '../../auth/auth.module'
import { IntegrationActionsModule } from '../../integration-actions/integration-actions.module'
import { IntegrationTriggersModule } from '../../integration-triggers/integration-triggers.module'
import { IntegrationsModule } from '../../integrations/integrations.module'
import { UsersModule } from '../../users/users.module'
import { AsyncSchemaResolver } from './async-schema.resolver'

describe('AsyncSchemaResolver', () => {
  let resolver: AsyncSchemaResolver

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        IntegrationsModule,
        IntegrationTriggersModule,
        IntegrationActionsModule,
        DefinitionsModule,
        RunnerModule,
        UsersModule,
      ],
      providers: [AsyncSchemaResolver],
    }).compile()

    resolver = testModule.get<AsyncSchemaResolver>(AsyncSchemaResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
