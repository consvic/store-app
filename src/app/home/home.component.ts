import { Component, OnInit } from '@angular/core';

import { Category } from './models/category.model';
import { Product } from './models/product.model';

import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[];
  products: Product[];
  originalProducts: Product[];
  unfilteredProducts: Product[];
  unSortedProducts: Product[];
  category: number;
  availability: boolean;
  priceTopRange: number;
  itemsInStock: number;
  sortBy: string;

  constructor(private categoriesService: CategoriesService, private productsService: ProductsService, private _cartService: CartService) {
    this.categories = [];
    this.products = [];
    this.unfilteredProducts = [];
    this.availability = true;
    this.sortBy = 'DEF';
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.calculateItemsInCart();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    }, err => {
      console.error('ERROR CATEGORIES:', err);
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
      this.originalProducts = this.products;
      this.unfilteredProducts = this.products;
      this.unSortedProducts = this.products;
    }, err => {
      console.error('ERROR PRODUCTS:', err);
    });
  }

  chooseCategory(id: number) {
    this.products = this.originalProducts.filter( product => {
      return product.sublevel_id === id;
    });
    this.unfilteredProducts = this.products;
    this.unSortedProducts = this.products;
  }

  clearCategories() {
    this.products = this.originalProducts;
    this.filter();
  }

  filter() {
    this.products = this.filterAvailability(this.unfilteredProducts);
    this.products = this.filterPrice(this.products);
    this.products = this.filterStock(this.products);
    this.unSortedProducts = this.products;
    this.sortItemsBy();
  }

  filterAvailability(products: Product[]) {
    return products.filter( product => {
      return this.availability === product.available;
    });
  }

  filterPrice(products: Product[]) {
    if (this.priceTopRange !== undefined) {
      return products.filter( product => {
        const price = parseFloat(product.price.replace(',', '').replace('$', ''));
        return price <= this.priceTopRange;
      });
    }
    return products;
  }

  filterStock(products: Product[]) {
    if ( this.itemsInStock !== undefined && this.itemsInStock !== null) {
      return products.filter( product => {
        return this.itemsInStock === product.quantity;
      });
    }
    return products;
  }

  sortItemsBy() {
    if (this.sortBy === 'DEF') {
      this.products = this.unSortedProducts;
      return;
    }

    if (this.sortBy === 'PLH') {
      this.products.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(',', '').replace('$', ''));
        const priceB = parseFloat(b.price.replace(',', '').replace('$', ''));
        if (priceA > priceB) {
          return 1;
        }
        if (priceA < priceB) {
          return -1;
        }
        return 0;
      });
    }

    if (this.sortBy === 'PHL') {
      this.products.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(',', '').replace('$', ''));
        const priceB = parseFloat(b.price.replace(',', '').replace('$', ''));
        if (priceA > priceB) {
          return -1;
        }
        if (priceA < priceB) {
          return 1;
        }
        return 0;
      });
    }

    if (this.sortBy === 'UA') {
      this.products.sort((a, b) => {
        if (a.available === true) {
           return 1;
        }
        if (b.available === true) {
          return -1;
        }
        return 0;
      });
    }

    if (this.sortBy === 'AU') {
      this.products.sort((a, b) => {
        if (a.available === true) {
           return -1;
        }
        if (b.available === true) {
          return 1;
        }
        return 0;
      });
    }

    if (this.sortBy === 'QLH') {
      this.products.sort((a, b) => {
        if (a.quantity > b.quantity) {
          return 1;
        }
        if (a.quantity < b.quantity) {
          return -1;
        }
        return 0;
      });
    }

    if (this.sortBy === 'QHL') {
      this.products.sort((a, b) => {
        if (a.quantity > b.quantity) {
          return -1;
        }
        if (a.quantity < b.quantity) {
          return 1;
        }
        return 0;
      });
    }
  }

  addToCart(event) {
    const cart = localStorage.getItem('cart');
    let cartList = [];
    if (cart) {
      cartList = JSON.parse(cart);
      const itemIndex = cartList.findIndex(item => {
        return item.id === event.id;
      });
      if (itemIndex > -1) {
        cartList[itemIndex].in_cart++;
      } else {
        cartList.push({...event, in_cart: 1});
      }
    } else {
      cartList.push({...event, in_cart: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cartList));
    this.calculateItemsInCart();
  }

  calculateItemsInCart() {
    let cartList = [];
    let sum = 0;
    const cart = localStorage.getItem('cart');
    if (cart) {
      cartList = JSON.parse(cart);
      cartList.forEach(item => {
        sum += item.in_cart;
      });
    }
    this._cartService.emitChange(sum);
  }
}
