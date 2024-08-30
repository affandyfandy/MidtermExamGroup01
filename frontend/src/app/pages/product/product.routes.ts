import { Routes } from "@angular/router";
import { ProductComponent } from "./product-list/product.component";
import { ProductFormComponent } from "./product-form/product-form.component";

export const productRoutes: Routes = [
    { path: '', component: ProductComponent },
    { path: ':id', component: ProductFormComponent },
    { path: 'create', component: ProductFormComponent }
];
