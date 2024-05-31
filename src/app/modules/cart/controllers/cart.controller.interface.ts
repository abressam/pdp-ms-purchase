import { DeleteCartResDto } from '@app/modules/cart/dtos/responses/delete-cart-res.dto';
import { GetAllCartsResDto } from '@app/modules/cart/dtos/responses/get-all-carts-res.dto';
import { DeleteCartReqDto } from '@app/modules/cart/dtos/requests/delete-cart-req.dto';
import { PutCartReqDto } from '@app/modules/cart/dtos/requests/put-cart-req.dto';

export interface CartControllerInterface {
  getAllCarts(req: Request): Promise<GetAllCartsResDto>;
  getCart(req: Request): Promise<GetAllCartsResDto>;
  putCart(
    body: PutCartReqDto,
    req: Request
  ): Promise<GetAllCartsResDto>;
  deleteCart(
    params: DeleteCartReqDto,
    req: Request
  ): Promise<DeleteCartResDto>;
}
