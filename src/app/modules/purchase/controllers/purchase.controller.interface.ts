import { GetPurchasesByCustomerResDto } from './../dtos/responses/get-purchases-by-customer-res.dto';
import { GetAllPurchasesResDto } from '@app/modules/purchase/dtos/responses/get-all-purchases-res.dto';
import { GetPurchaseResDto } from '@app/modules/purchase/dtos/responses/get-purchase-res.dto';
import { GetPurchaseReqDto } from '@app/modules/purchase/dtos/requests/get-purchase-req.dto';
import { PostPurchaseReqDto } from '@app/modules/purchase/dtos/requests/post-purchase-req.dto';
import { GetPurchasesByCustomerReqDto } from '@app/modules/purchase/dtos/requests/get-purchases-by-customer-req.dto';

export interface PurchaseControllerInterface {
  getAllPurchases(): Promise<GetAllPurchasesResDto>;
  getPurchasesByCustomer(params: GetPurchasesByCustomerReqDto): Promise<GetPurchasesByCustomerResDto>;
  getPurchase(params: GetPurchaseReqDto): Promise<GetPurchaseResDto>;
  postPurchase(body: PostPurchaseReqDto): Promise<GetPurchaseResDto>;
}
