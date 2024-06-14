import { PurchaseService } from '@app/modules/purchase/services/purchase.service';
import { PurchaseControllerInterface } from '@app/modules/purchase/controllers/purchase.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
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
  Request,
  Body,
  HttpCode,
  HttpException,
  Logger,
  Post,
} from '@nestjs/common';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController implements PurchaseControllerInterface {
  constructor(private readonly PurchaseService: PurchaseService) {}

  @Get('info/closed')
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

  @Get('info/open')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the purchase data by customer' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the purchase data by customer',
    type: GetAllPurchasesResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getPurchasesByCustomer(@Request() req: Request) {
    const logger = new Logger(PurchaseController.name);

    try {
      const userId = req['userId'];
      logger.log('getPurchasesByCustomer()');
      return await this.PurchaseService.getPurchase(userId);
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
    type: GetAllPurchasesResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async postPurchase(@Body() body: PostPurchaseReqDto, @Request() req: Request) {
    const logger = new Logger(PurchaseController.name);

    try {
      const userId = req['userId'];
      logger.log('postPurchase()');
      return await this.PurchaseService.postPurchase(userId, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
