import { DeleteCartResDto } from '@app/modules/cart/dtos/responses/delete-cart-res.dto';
import { GetAllCartsResDto } from '@app/modules/cart/dtos/responses/get-all-carts-res.dto';
import { PutCartReqDto } from '@app/modules/cart/dtos/requests/put-cart-req.dto';
import { GetCartResDto } from '@app/modules/cart//dtos/responses/get-cart-res.dto';

export interface CartServiceInterface {
  getAllCarts(isAdmin: boolean): Promise<GetAllCartsResDto>;
  getCart(cartId: number): Promise<GetCartResDto>;
  putCart(
    isAdmin: boolean,
    cartId: number,
    body: PutCartReqDto,
  ): Promise<GetCartResDto>;
  deleteCart(cartId: number, isAdmin: boolean): Promise<DeleteCartResDto>;
}
