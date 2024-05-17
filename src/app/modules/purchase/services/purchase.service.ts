import { PurchaseServiceInterface } from '@app/modules/purchase/services/purchase.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeletePurchaseResDto } from '@app/modules/purchase/dtos/responses/delete-purchase-res.dto';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { PutPurchaseReqDto } from '@app/modules/purchase/dtos/requests/put-purchase-req.dto';
import { Purchase } from '@app/modules/purchase/models/purchase.model';
import { GetPurchaseResDto } from '@app/modules/purchase/dtos/responses/get-purchase-res.dto';

@Injectable()
export class PurchaseService implements PurchaseServiceInterface {
  constructor(
    @InjectModel(Purchase)
    private purchaseModel: typeof Purchase,
  ) {}

  async getAllPurchases(): Promise<GetAllPurchasesResDto> {
    const purchase = await this.purchaseModel.findAll();
    this.validatePurchase(purchase[0]);

    return { purchase };
  }

  async getPurchase(purchaseId: number): Promise<GetPurchaseResDto> {
    const purchase = await this.purchaseModel.findByPk(purchaseId)
    this.validatePurchase(purchase)

    return { purchase }
  }

  async putPurchase(
    isAdmin: boolean,
    purchaseId: number,
    body: PutPurchaseReqDto,
  ): Promise<GetPurchaseResDto> {
    const purchaseOld = await this.purchaseModel.findByPk(purchaseId);

    let purchaseNew: Purchase;

    if (purchaseOld) {

      purchaseNew = Object.assign({}, purchaseOld.dataValues, body);

      await this.purchaseModel.update(
        {
          brand: purchaseNew.brand,
          price: purchaseNew.price,
          quantity: purchaseNew.quantity,
          en_name: purchaseNew.en_name,
          pt_name: purchaseNew.pt_name,
          en_type: purchaseNew.en_type,
          pt_type: purchaseNew.pt_type,
          en_desc: purchaseNew.en_desc,
          pt_desc: purchaseNew.pt_desc
        },
        {
          where: {
            id: isAdmin,
          },
        },
      );
    } else {
      this.validateInsert(body);

      purchaseNew = await this.purchaseModel.create({
        brand: body.brand,
        price: body.price,
        quantity: body.quantity,
        en_name: body.en_name,
        pt_name: body.pt_name,
        en_type: body.en_type,
        pt_type: body.pt_type,
        en_desc: body.en_desc,
        pt_desc: body.pt_desc
      });
    }

    return { 
      purchase: {
        id: purchaseNew.id,
        brand: purchaseNew.brand,
        price: purchaseNew.price,
        quantity: purchaseNew.quantity,
        en_name: purchaseNew.en_name,
        pt_name: purchaseNew.pt_name,
        en_type: purchaseNew.en_type,
        pt_type: purchaseNew.pt_type,
        en_desc: purchaseNew.en_desc,
        pt_desc: purchaseNew.pt_desc
      },
     };
  }

  async deletePurchase(purchaseId: number, isAdmin: boolean): Promise<DeletePurchaseResDto> {
    this.validateAuth(isAdmin)

    const purchase = await this.purchaseModel.findByPk(purchaseId);

    this.validatePurchase(purchase);

    await purchase.destroy();

    return {
      statusCode: 200,
      message: 'Purchase successfully deleted',
    };
  }

  private validateInsert(body: PutPurchaseReqDto) {
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

  private validateAuth(isAdmin: boolean) {
    if (!isAdmin) {
      throw new HttpException('Unable to delete purchase', HttpStatus.UNAUTHORIZED);
    }
  }
}
