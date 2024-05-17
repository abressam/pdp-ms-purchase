import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { PostPurchaseReqDto } from '@app/modules/purchase/dtos/requests/post-purchase-req.dto';
import { GetPurchaseResDto } from '@app/modules/purchase/dtos/responses/get-purchase-res.dto';
import { GetPurchasesByCustomerResDto } from '@app/modules/purchase/dtos/responses/get-purchases-by-customer-res.dto';

export interface PurchaseServiceInterface {
  getAllPurchases(): Promise<GetAllPurchasesResDto>;
  getPurchasesByCustomer(customerId: number): Promise<GetPurchasesByCustomerResDto>;
  getPurchase(purchaseId: number): Promise<GetPurchaseResDto>;
  postPurchase(body: PostPurchaseReqDto): Promise<GetPurchaseResDto>
}
