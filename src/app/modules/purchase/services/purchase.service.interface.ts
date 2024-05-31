import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { PostPurchaseReqDto } from '@app/modules/purchase/dtos/requests/post-purchase-req.dto';

export interface PurchaseServiceInterface {
  getAllPurchases(isAdmin: boolean): Promise<GetAllPurchasesResDto>;
  getPurchase(userId: number): Promise<GetAllPurchasesResDto>;
  postPurchase(userId: number, body: PostPurchaseReqDto): Promise<GetAllPurchasesResDto>
}
