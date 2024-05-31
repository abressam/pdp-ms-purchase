import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { PostPurchaseReqDto } from '@app/modules/purchase/dtos/requests/post-purchase-req.dto';

export interface PurchaseControllerInterface {
  getAllPurchases(req: Request): Promise<GetAllPurchasesResDto>;
  getPurchasesByCustomer(req: Request): Promise<GetAllPurchasesResDto>;
  postPurchase(body: PostPurchaseReqDto, req: Request): Promise<GetAllPurchasesResDto>;
}
