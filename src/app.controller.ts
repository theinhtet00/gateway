import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller()
export class AppController {
  constructor(
    @Inject('Order_Service') private client: ClientProxy,
    @Inject('Product_Service') private readonly productClient: ClientProxy,
  ) {}

  @Get('/orders')
  getAll(): Observable<string> {
    return this.client.send('get_all_orders', '').pipe((res) => res);
  }

  @Get('/orders/:id')
  getOne(@Param('id') id: string): Observable<object> {
    return this.client.send('get_one_order', id).pipe((res) => res);
  }

  @Post('/orders')
  async createOrder(@Body() body: CreateOrderDto): Promise<Observable<object>> {
    return this.client.send('store_order', body).pipe((res) => res);
  }

  @Get('/products')
  async getAllProduct(): Promise<Observable<object>> {
    return this.productClient.send('get_all_product', '').pipe((res) => res);
  }

  @Get('/products/:id')
  async getProductById(@Param('id') id: string): Promise<Observable<object>> {
    return this.productClient.send('get_product_by_id', id).pipe((res) => res);
  }

  @Post('/products')
  async createProduct(
    @Body() body: CreateProductDto,
  ): Promise<Observable<object>> {
    return this.productClient.send('create_product', body).pipe((res) => res);
  }

  @Put('/products/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: CreateProductDto,
  ): Promise<Observable<object>> {
    return this.productClient
      .send('update_product', { id, body })
      .pipe((res) => res);
  }

  @Delete('/products/:id')
  async deleteProduct(@Param('id') id: string): Promise<Observable<object>> {
    return this.productClient.send('delete_product', id).pipe((res) => res);
  }
}
