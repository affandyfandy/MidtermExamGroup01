import { Routes } from "@angular/router";
import { ProductComponent } from "./product-list/product.component";
import { CustomerFormComponent } from "./product-form/product-form.component";

export const productRoutes: Routes = [
    { path: '', component: ProductComponent },
    { path: ':id', component: CustomerFormComponent },
    { path: 'create', component: CustomerFormComponent }
];
