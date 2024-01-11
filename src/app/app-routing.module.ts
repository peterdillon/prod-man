import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './edit-products/view-product/view-product.component';
import { CreateProductComponent } from './edit-products/create-update-product/create-update-product.component';

const routes: Routes = [
  { path: 'view-product', component: ViewProductComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'edit-product/:id', component: CreateProductComponent },
  { path: '', redirectTo: '/view-product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
