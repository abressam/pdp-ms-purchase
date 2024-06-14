import { DeleteCartResDto } from '@app/modules/cart/dtos/responses/delete-cart-res.dto';
import { GetAllCartsResDto } from '@app/modules/cart/dtos/responses/get-all-carts-res.dto';
import { PutCartReqDto } from '@app/modules/cart/dtos/requests/put-cart-req.dto';

export interface CartServiceInterface {
  getAllCarts(userId: number): Promise<GetAllCartsResDto>;
  getCart(userId: number): Promise<GetAllCartsResDto>;
  putCart(
    userId: number,
    body: PutCartReqDto,
  ): Promise<GetAllCartsResDto>;
  deleteCart(userId: number, productId: number): Promise<DeleteCartResDto>;
}
