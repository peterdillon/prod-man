import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from '../app/edit-products/add-product/add-product.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: '', redirectTo: '/add-product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
