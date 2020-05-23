import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'product', component: ProductComponent, canActivate: [AdminGuard]},
  {path: 'product/create', component: ProductCreateComponent, canActivate: [AdminGuard]},
  {path: 'product/:productId', component: ProductDetailsComponent, canActivate: [AdminGuard]},
  {path: '**', component: LoginComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  LoginComponent,
  ProductComponent,
  ProductDetailsComponent,
  ProductCreateComponent
];
