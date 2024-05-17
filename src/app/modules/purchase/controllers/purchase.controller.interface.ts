import { DeletePurchaseResDto } from '@app/modules/purchase/dtos/responses/delete-purchase-res.dto';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { GetPurchaseResDto } from '../dtos/responses/get-purchase-res.dto';
import { GetPurchaseReqDto } from '@app/modules/purchase/dtos/requests/get-purchase-req.dto';
import { DeletePurchaseReqDto } from '@app/modules/purchase/dtos/requests/delete-purchase-req.dto';
import { PutPurchaseReqDto } from '@app/modules/purchase/dtos/requests/put-purchase-req.dto';

export interface PurchaseControllerInterface {
  getAllPurchases(): Promise<GetAllPurchasesResDto>;
  getPurchase(params: GetPurchaseReqDto): Promise<GetPurchaseResDto>;
  putPurchase(
    body: PutPurchaseReqDto,
    req: Request,
  ): Promise<GetPurchaseResDto>;
  deletePurchase(
    params: DeletePurchaseReqDto,
    req: Request
  ): Promise<DeletePurchaseResDto>;
}
