import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
  });
  app.enableCors({
    origin: '*',
  });

  await app.listen(5000, () => {
    console.log(`gateway is running at port 5000`);
  });
}
bootstrap();
