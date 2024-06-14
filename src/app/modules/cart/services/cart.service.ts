import { PutCartReqDto } from '@app/modules/cart/dtos/requests/put-cart-req.dto';
import { CartServiceInterface } from '@app/modules/cart/services/cart.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '@app/modules/cart/models/cart.model';
import { GetAllCartsResDto } from '@app/modules/cart/dtos/responses/get-all-carts-res.dto';
import { DeleteCartResDto } from '@app/modules/cart/dtos/responses/delete-cart-res.dto';
import { Op } from 'sequelize';

@Injectable()
export class CartService implements CartServiceInterface {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
  ) {}

  async getAllCarts(userId: number): Promise<GetAllCartsResDto> {
    const carts = await this.cartModel.findAll({
      where: {
        fk_Customer_id: userId,
        fk_Purchase_id: {
          [Op.ne]: null
        }
      }
    });

    this.validateCart(carts[0]);

    return {
      cart: carts.map((cart) => ({
        productId: cart.fk_Product_id,
        quantity: cart.quantity
      })),
    };
  }

  async getCart(userId: number): Promise<GetAllCartsResDto> {
    const carts = await this.cartModel.findAll({
      where: {
        fk_Customer_id: userId,
        fk_Purchase_id: null,
      }
    });

    this.validateCart(carts[0]);

    return {
      cart: carts.map((cart) => ({
        productId: cart.fk_Product_id,
        quantity: cart.quantity
      })),
    };
  }

  async putCart(
    userId: number,
    body: PutCartReqDto,
  ): Promise<GetAllCartsResDto> {
    body['fk_Product_id'] = body.productId;
    const cartOld = await this.cartModel.findOne({
      where: {
        fk_Product_id: body.productId,
        fk_Customer_id: userId,
        fk_Purchase_id: null,
      }
    });

    let cartNew: Cart;

    if (cartOld) {
      cartNew = Object.assign({}, cartOld.dataValues, body);

      await this.cartModel.update(
        {
          quantity: cartNew.quantity
        },
        {
          where: {
            fk_Product_id: body.productId,
            fk_Customer_id: userId,
            fk_Purchase_id: null,
          }
        },
      );
    } else {
      cartNew = await this.cartModel.create({
        quantity: body.quantity,
        fk_Product_id: body.productId,
        fk_Customer_id: userId,
        fk_Purchase_id: null,
      });
    }

    return await this.getCart(userId);
  }

  async deleteCart(userId: number, productId: number): Promise<DeleteCartResDto> {
    const cart = await this.cartModel.findOne({
      where: {
        fk_Product_id: productId,
        fk_Customer_id: userId,
        fk_Purchase_id: null,
      }
    });

    this.validateCart(cart);

    await cart.destroy();

    return {
      statusCode: 200,
      message: 'Cart successfully deleted',
    };
  }

  private validateCart(cart: Cart) {
    if (!cart) {
      throw new HttpException('No cart found', HttpStatus.NOT_FOUND);
    }
  }

  private validateAuth(isAdmin: boolean) {
    if (!isAdmin) {
      throw new HttpException('Invalid session', HttpStatus.UNAUTHORIZED);
    }
  }
}
