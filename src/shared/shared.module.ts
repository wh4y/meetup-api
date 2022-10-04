import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './module/database/database.module';

@Global()
@Module({
  imports: [
    DatabaseModule.registerAsync(),
  ],
  exports: [
    DatabaseModule,
  ],
})
export class SharedModule {
}
