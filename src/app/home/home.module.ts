import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { HomeComponent } from './home.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  declarations: [HomeComponent, ProductItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatCheckboxModule
  ]
})
export class HomeModule { }
