import { DeleteCartResDto } from '@app/modules/cart/dtos/responses/delete-cart-res.dto';
import { GetAllCartsResDto } from '@app/modules/cart/dtos/responses/get-all-carts-res.dto';
import { GetCartResDto } from '../dtos/responses/get-cart-res.dto';
import { GetCartReqDto } from '@app/modules/cart/dtos/requests/get-cart-req.dto';
import { DeleteCartReqDto } from '@app/modules/cart/dtos/requests/delete-cart-req.dto';
import { PutCartReqDto } from '@app/modules/cart/dtos/requests/put-cart-req.dto';

export interface CartControllerInterface {
  getAllCarts(): Promise<GetAllCartsResDto>;
  getCart(params: GetCartReqDto): Promise<GetCartResDto>;
  putCart(
    body: PutCartReqDto,
    req: Request,
  ): Promise<GetCartResDto>;
  deleteCart(
    params: DeleteCartReqDto,
    req: Request
  ): Promise<DeleteCartResDto>;
}
