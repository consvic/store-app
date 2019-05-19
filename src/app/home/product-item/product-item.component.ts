import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Output() cart = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.cart.emit(product);
  }

}
