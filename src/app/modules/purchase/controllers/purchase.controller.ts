import { PurchaseService } from '@app/modules/purchase/services/purchase.service';
import { PurchaseControllerInterface } from '@app/modules/purchase/controllers/purchase.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { GetPurchaseResDto } from '@app/modules/purchase/dtos/responses/get-purchase-res.dto';
import { GetPurchaseReqDto } from '@app/modules/purchase/dtos/requests/get-purchase-req.dto';
import { GetPurchasesByCustomerReqDto } from '@app/modules/purchase/dtos/requests/get-purchases-by-customer-req.dto';
import { GetPurchasesByCustomerResDto } from '@app/modules/purchase/dtos/responses/get-purchases-by-customer-res.dto';
import { PostPurchaseReqDto } from '@app/modules/purchase/dtos/requests/post-purchase-req.dto';
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
  Post,
} from '@nestjs/common';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController implements PurchaseControllerInterface {
  constructor(private readonly PurchaseService: PurchaseService) {}

  @Get('info')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get all purchases data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with all the purchases data',
    type: GetAllPurchasesResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getAllPurchases() {
    const logger = new Logger(PurchaseController.name);

    try {
      logger.log('getAllPurchases()');
      return await this.PurchaseService.getAllPurchases();
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  
  @Get('info/customer/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the purchase data by customer' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the purchase data by customer',
    type: GetPurchasesByCustomerResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getPurchasesByCustomer(@Param() params: GetPurchasesByCustomerReqDto) {
    const logger = new Logger(PurchaseController.name);

    try {
      const customerId = params.customerId;
      logger.log('getPurchasesByCustomer()');
      return await this.PurchaseService.getPurchasesByCustomer(customerId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Get('info/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the purchase data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the purchase data',
    type: GetPurchaseResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getPurchase(@Param() params: GetPurchaseReqDto) {
    const logger = new Logger(PurchaseController.name);

    try {
      const purchaseId = params.id;
      logger.log('getPurchase()');
      return await this.PurchaseService.getPurchase(purchaseId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Post('insert')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Post the purchase data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the purchase data',
    type: GetPurchaseResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async postPurchase(@Body() body: PostPurchaseReqDto) {
    const logger = new Logger(PurchaseController.name);

    try {
      logger.log('postPurchase()');
      return await this.PurchaseService.postPurchase(body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
