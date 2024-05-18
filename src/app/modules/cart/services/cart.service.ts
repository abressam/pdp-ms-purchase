import { PutCartReqDto } from '@app/modules/cart/dtos/requests/put-cart-req.dto';
import { CartServiceInterface } from '@app/modules/cart/services/cart.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '@app/modules/cart/models/cart.model';
import { CartProducts } from '@app/modules/cart-products/models/cart-products.model';
import { Product } from '@app/modules/product/models/product.model';
import { ProductDto } from '@app/modules/product/dtos/product.dto';
import { CartProductsDto } from '@app/modules/cart-products/dtos/cart-products.dto';
import { GetCartResDto } from '@app/modules/cart/dtos/responses/get-cart-res.dto';
import { DeleteCartResDto } from '@app/modules/cart/dtos/responses/delete-cart-res.dto';
import { CartDto } from '@app/modules/cart/dtos/cart.dto';

@Injectable()
export class CartService implements CartServiceInterface {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
  ) {}

  async getCartById(cartId: number): Promise<GetCartResDto> {
    const cart = await this.cartModel.findByPk(cartId, {
      include: [{
        model: CartProducts,
        include: [Product]
      }]
    });

    this.validateCart(cart[0]);

    const cartDto: CartDto = {
      id: cart.id,
      qt_total: cart.qt_total,
      status: cart.status,
      customerId: cart.fk_Customer_id,
      cartProducts: cart.cartProducts.map(cartProduct => ({
        cartId: cartProduct.cart_id,
        productId: cartProduct.product_id,
        quantity: cartProduct.quantity,
        product: {
          id: cartProduct.product.id,
          brand: cartProduct.product.brand,
          price: cartProduct.product.price,
          quantity: cartProduct.product.quantity,
          en_name: cartProduct.product.en_name,
          pt_name: cartProduct.product.pt_name,
          en_type: cartProduct.product.en_type,
          pt_type: cartProduct.product.pt_type,
          en_desc: cartProduct.product.en_desc,
          pt_desc: cartProduct.product.pt_desc,
        } as ProductDto
      } as CartProductsDto))
    };

    return { cart: cartDto };
  }

  async putCart(
    cartId: number,
    body: PutCartReqDto,
  ): Promise<GetCartResDto> {
    const cartOld = await this.cartModel.findByPk(cartId, {
      include: [CartProducts]
    });

    let cartNew: Cart;

    if (cartOld) {
      // Terminar o update

    } else {
      this.validateInsert(body);

      cartNew = await this.cartModel.create({
        qt_total: body.qt_total,
        status: body.status,
        customerId: body.customerId,
        cartProducts: body.cartProducts.map(cp => ({
          productId: cp.productId,
          quantity: cp.quantity
        })),
      }, {
        include: [CartProducts],
      });
    }

    const cartDto: CartDto = {
      id: cartNew.id,
      qt_total: cartNew.qt_total,
      status: cartNew.status,
      customerId: cartNew.fk_Customer_id,
      cartProducts: cartNew.cartProducts.map(cartProduct => ({
        cartId: cartProduct.cart_id,
        productId: cartProduct.product_id,
        quantity: cartProduct.quantity,
        product: {
          id: cartProduct.product.id,
          brand: cartProduct.product.brand,
          price: cartProduct.product.price,
          quantity: cartProduct.product.quantity,
          en_name: cartProduct.product.en_name,
          pt_name: cartProduct.product.pt_name,
          en_type: cartProduct.product.en_type,
          pt_type: cartProduct.product.pt_type,
          en_desc: cartProduct.product.en_desc,
          pt_desc: cartProduct.product.pt_desc,
        } as ProductDto
      } as CartProductsDto))
    };

    return { cart: cartDto };
  }

  async deleteCart(cartId: number): Promise<DeleteCartResDto> {
    const cart = await this.cartModel.findByPk(cartId);

    this.validateCart(cart);

    await cart.destroy();

    return {
      statusCode: 200,
      message: 'Cart successfully deleted',
    };
  }

  private validateInsert(body: PutCartReqDto) {
    const emptyFields = Object.keys(body).length !== 9;

    if (emptyFields) {
      throw new HttpException(
        'Cannot insert empty fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateCart(cart: Cart) {
    if (!cart) {
      throw new HttpException('No cart found', HttpStatus.NOT_FOUND);
    }
  }
}
