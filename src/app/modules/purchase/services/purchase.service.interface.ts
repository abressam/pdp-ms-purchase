import { DeletePurchaseResDto } from '@app/modules/purchase/dtos/responses/delete-purchase-res.dto';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { PutPurchaseReqDto } from '@app/modules/purchase/dtos/requests/put-purchase-req.dto';
import { GetPurchaseResDto } from '@app/modules/purchase//dtos/responses/get-purchase-res.dto';

export interface PurchaseServiceInterface {
  getAllPurchases(isAdmin: boolean): Promise<GetAllPurchasesResDto>;
  getPurchase(purchaseId: number): Promise<GetPurchaseResDto>;
  putPurchase(
    isAdmin: boolean,
    purchaseId: number,
    body: PutPurchaseReqDto,
  ): Promise<GetPurchaseResDto>;
  deletePurchase(purchaseId: number, isAdmin: boolean): Promise<DeletePurchaseResDto>;
}
