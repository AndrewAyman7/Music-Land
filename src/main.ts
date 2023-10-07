import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets( join(__dirname , '..' , 'files') ); 
  app.useStaticAssets( join(__dirname , '..' , 'images') );// el a7sn t5le el Assets fe 1 folder (bdl el images w el files)
  await app.listen(process.env.PORT);
}
bootstrap();
