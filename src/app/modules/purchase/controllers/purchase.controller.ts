import { PurchaseService } from '@app/modules/purchase/services/purchase.service';
import { PurchaseControllerInterface } from '@app/modules/purchase/controllers/purchase.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeletePurchaseResDto } from '@app/modules/purchase/dtos/responses/delete-purchase-res.dto';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { GetPurchaseResDto } from '@app/modules/purchase/dtos/responses/get-purchase-res.dto';
import { GetPurchaseReqDto } from '@app/modules/purchase/dtos/requests/get-purchase-req.dto';
import { DeletePurchaseReqDto } from '@app/modules/purchase/dtos/requests/delete-purchase-req.dto';
import { PutPurchaseReqDto } from '@app/modules/purchase/dtos/requests/put-purchase-req.dto';
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

  @Put('insert')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Put the purchase data' })
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
  async putPurchase(@Body() body: PutPurchaseReqDto, @Request() req: Request) {
    const logger = new Logger(PurchaseController.name);

    try {
      const isAdmin = req['isAdmin'];
      const purchaseId = body.id;
      logger.log('putPurchase()');
      return await this.PurchaseService.putPurchase(isAdmin, purchaseId, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Delete('remove/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Delete the purchase data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the purchase status',
    type: DeletePurchaseResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async deletePurchase(@Param() params: DeletePurchaseReqDto, @Request() req: Request) {
    const logger = new Logger(PurchaseController.name);

    try {
      const purchaseId = params.id;
      const isAdmin = req['isAdmin'];
      logger.log('deletePurchase()');
      return await this.PurchaseService.deletePurchase(purchaseId, isAdmin);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
