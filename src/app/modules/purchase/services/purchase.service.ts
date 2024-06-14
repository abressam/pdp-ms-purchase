import { PurchaseServiceInterface } from '@app/modules/purchase/services/purchase.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { PostPurchaseReqDto } from '@app/modules/purchase/dtos/requests/post-purchase-req.dto';
import { Purchase } from '@app/modules/purchase/models/purchase.model';
import { Cart } from '@app/modules/cart/models/cart.model';

@Injectable()
export class PurchaseService implements PurchaseServiceInterface {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
    @InjectModel(Purchase)
    private purchaseModel: typeof Purchase,
  ) {}

  async getAllPurchases(): Promise<GetAllPurchasesResDto> {
    const purchases = await this.purchaseModel.findAll();
    this.validatePurchase(purchases[0]);

    return { purchases: purchases.map(purchase => ({
      type: purchase.type,
      parcel: purchase.parcel,
      price: purchase.price,
      qt_parcel: purchase.qt_parcel,
      date: purchase.date
    })) };
  }

  async getPurchase(userId: number): Promise<GetAllPurchasesResDto> {
    const purchases = await this.purchaseModel.findAll({
      where: {
        fk_Customer_id: userId
      }
    });
    this.validatePurchase(purchases[0])

    return { purchases: purchases.map(purchase => ({
      type: purchase.type,
      parcel: purchase.parcel,
      price: purchase.price,
      qt_parcel: purchase.qt_parcel,
      date: purchase.date
    })) };
  }

  async postPurchase(
    userId: number,
    body: PostPurchaseReqDto,
  ): Promise<GetAllPurchasesResDto> {
    const cart = await this.cartModel.findOne({
      where: {
        fk_Customer_id: userId,
        fk_Purchase_id: null,
      }
    });
    this.validateCart(cart);

    const purchase = await this.purchaseModel.create({
      type: body.type,
      parcel: body.parcel,
      price: body.price,
      qt_parcel: body.qt_parcel,
      date: new Date(),
      fk_Customer_id: userId
    });

    await this.cartModel.update(
      {
        fk_Purchase_id: purchase.id
      },
      {
        where: {
          fk_Customer_id: userId,
          fk_Purchase_id: null,
        }
      },
    );

    return await this.getPurchase(userId);
  }

  private validateCart(cart: Cart) {
    if (!cart) {
      throw new HttpException('No cart open', HttpStatus.NOT_FOUND);
    }
  }

  private validatePurchase(purchase: Purchase) {
    if (!purchase) {
      throw new HttpException('No purchase found', HttpStatus.NOT_FOUND);
    }
  }

  private validateAuth(isAdmin: boolean) {
    if (!isAdmin) {
      throw new HttpException('Invalid session', HttpStatus.UNAUTHORIZED);
    }
  }
}
