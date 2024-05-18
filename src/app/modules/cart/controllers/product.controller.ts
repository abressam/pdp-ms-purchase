import { CartService } from '@app/modules/cart/services/cart.service';
import { CartControllerInterface } from '@app/modules/cart/controllers/cart.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteCartResDto } from '@app/modules/cart/dtos/responses/delete-cart-res.dto';
import { GetAllCartsResDto } from '@app/modules/cart/dtos/responses/get-all-carts-res.dto';
import { GetCartResDto } from '@app/modules/cart/dtos/responses/get-cart-res.dto';
import { GetCartReqDto } from '@app/modules/cart/dtos/requests/get-cart-req.dto';
import { DeleteCartReqDto } from '@app/modules/cart/dtos/requests/delete-cart-req.dto';
import { PutCartReqDto } from '@app/modules/cart/dtos/requests/put-cart-req.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Put,
  Delete,
  Request,
  Body,
  Param,
  HttpCode,
  HttpException,
  Logger,
} from '@nestjs/common';

@ApiTags('cart')
@Controller('cart')
export class CartController implements CartControllerInterface {
  constructor(private readonly cartService: CartService) {}

  @Get('info')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get all carts data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with all the carts data',
    type: GetAllCartsResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getAllCarts() {
    const logger = new Logger(CartController.name);

    try {
      logger.log('getAllCarts()');
      return await this.cartService.getAllCarts();
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  
  @Get('info/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the cart data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the cart data',
    type: GetCartResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getCart(@Param() params: GetCartReqDto) {
    const logger = new Logger(CartController.name);

    try {
      const cartId = params.id;
      logger.log('getCart()');
      return await this.cartService.getCart(cartId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Put('insert')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Put the cart data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the cart data',
    type: GetCartResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async putCart(@Body() body: PutCartReqDto, @Request() req: Request) {
    const logger = new Logger(CartController.name);

    try {
      const isAdmin = req['isAdmin'];
      const cartId = body.id;
      logger.log('putCart()');
      return await this.cartService.putCart(isAdmin, cartId, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Delete('remove/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Delete the cart data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the cart status',
    type: DeleteCartResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async deleteCart(@Param() params: DeleteCartReqDto, @Request() req: Request) {
    const logger = new Logger(CartController.name);

    try {
      const cartId = params.id;
      const isAdmin = req['isAdmin'];
      logger.log('deleteCart()');
      return await this.cartService.deleteCart(cartId, isAdmin);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
