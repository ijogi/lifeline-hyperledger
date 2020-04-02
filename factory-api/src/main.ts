import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import enrollAdmin from './utils/enrollAdmin';
import registerUser from './utils/registerUser';

async function bootstrap() {
  await enrollAdmin();
  await registerUser();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
