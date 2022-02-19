import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Order_Service',
        transport: Transport.TCP,
      },
      {
        name: 'Payment_Service',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'Product_Service',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
