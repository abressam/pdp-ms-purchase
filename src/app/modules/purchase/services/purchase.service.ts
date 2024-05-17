import { PurchaseServiceInterface } from '@app/modules/purchase/services/purchase.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { PostPurchaseReqDto } from '@app/modules/purchase/dtos/requests/post-purchase-req.dto';
import { Purchase } from '@app/modules/purchase/models/purchase.model';
import { GetPurchaseResDto } from '@app/modules/purchase/dtos/responses/get-purchase-res.dto';
import { GetPurchasesByCustomerResDto } from '@app/modules/purchase/dtos/responses/get-purchases-by-customer-res.dto';
import { PurchaseDto } from '@app/modules/purchase/dtos/purchase.dto';

@Injectable()
export class PurchaseService implements PurchaseServiceInterface {
  constructor(
    @InjectModel(Purchase)
    private purchaseModel: typeof Purchase,
  ) {}

  async getAllPurchases(): Promise<GetAllPurchasesResDto> {
    const purchases = await this.purchaseModel.findAll();
    this.validatePurchase(purchases[0]);

    const purchaseDto: PurchaseDto[] = purchases.map(purchase => ({
      id: purchase.id,
      type: purchase.type,
      parcel: purchase.parcel,
      price: purchase.price,
      qt_parcel: purchase.qt_parcel,
      date: purchase.date,
      cartId: purchase.fk_Cart_id,
      customerId: purchase.fk_Customer_id
    }));

    return { purchases: purchaseDto };
  }

  
  async getPurchasesByCustomer(customerId: number): Promise<GetPurchasesByCustomerResDto> {
    const purchases = await this.purchaseModel.findAll({
      where: {
        customerId: customerId,
      }
    });
    this.validatePurchase(purchases[0]);

    const purchaseDto: PurchaseDto[] = purchases.map(purchase => ({
      id: purchase.id,
      type: purchase.type,
      parcel: purchase.parcel,
      price: purchase.price,
      qt_parcel: purchase.qt_parcel,
      date: purchase.date,
      cartId: purchase.fk_Cart_id,
      customerId: purchase.fk_Customer_id
    }));

    return { customerId, purchases: purchaseDto };
  }

  async getPurchase(purchaseId: number): Promise<GetPurchaseResDto> {
    const purchase = await this.purchaseModel.findByPk(purchaseId)
    this.validatePurchase(purchase)

    return { 
      purchase: {
        id: purchase.id,
        type: purchase.type,
        parcel: purchase.parcel,
        price: purchase.price,
        qt_parcel: purchase.qt_parcel,
        date: purchase.date,
        cartId: purchase.fk_Cart_id,
        customerId: purchase.fk_Customer_id
      },
     };
  }

  async postPurchase(
    body: PostPurchaseReqDto,
  ): Promise<GetPurchaseResDto> {
    let purchase: Purchase;

    this.validateInsert(body);

    purchase = await this.purchaseModel.create({
      type: body.type,
      parcel: body.parcel,
      price: body.price,
      qt_parcel: body.qt_parcel,
      date: body.date,
      cartId: body.cartId,
      customerId: body.customerId
    });
    

    return { 
      purchase: {
        id: purchase.id,
        type: purchase.type,
        parcel: purchase.parcel,
        price: purchase.price,
        qt_parcel: purchase.qt_parcel,
        date: purchase.date,
        cartId: purchase.fk_Cart_id,
        customerId: purchase.fk_Customer_id
      },
     };
  }

  private validateInsert(body: PostPurchaseReqDto) {
    const emptyFields = Object.keys(body).length !== 9;

    if (emptyFields) {
      throw new HttpException(
        'Cannot insert empty fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validatePurchase(purchase: Purchase) {
    if (!purchase) {
      throw new HttpException('No purchase found', HttpStatus.NOT_FOUND);
    }
  }
}
