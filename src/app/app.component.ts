import { Component } from '@angular/core';

import { CartService } from './_services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  itemsInCart: number;

  constructor(private _cartService: CartService) {
    _cartService.changeEmitted$.subscribe(
        cart => {
           this.itemsInCart = cart;
        });
  }
}
