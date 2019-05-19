import { Component, OnInit } from '@angular/core';

import { CartService } from '../_services/cart.service';

import { CartProduct } from './models/cart-product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: CartProduct[];

  constructor(private _cartService: CartService) {
    this.cartProducts = [];
  }

  ngOnInit() {
    this.calculateItemsInCart();
  }

  calculateItemsInCart() {
    let cartList = [];
    let sum = 0;
    const cart = localStorage.getItem('cart');
    if (cart) {
      cartList = JSON.parse(cart);
      this.cartProducts = cartList;
      cartList.forEach(item => {
        sum += item.in_cart;
      });
    }
    this._cartService.emitChange(sum);
  }

  convertPriceToNumber(price: string) {
    return parseFloat(price.replace(',', '').replace('$', ''));
  }

  calculateTotal() {
    if (this.cartProducts.length > 0) {
      let total = 0;
      this.cartProducts.forEach(product => {
        total += (product.in_cart * this.convertPriceToNumber(product.price));
      });
      return total;
    }
    return 0;
  }

  substractItem(index) {
    this.cartProducts[index].in_cart -= 1;
  }

  addItem(index) {
    this.cartProducts[index].in_cart += 1;
  }

  deleteItem(index) {
    this.cartProducts.splice(index, 1);
  }
}
