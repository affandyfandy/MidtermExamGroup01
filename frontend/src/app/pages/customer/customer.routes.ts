import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer-list/customer.component";
import { CustomerFormComponent } from "./customer-form/customer-form.component";

export const customerRoutes: Routes = [
    { path: '', component: CustomerComponent },
    { path: ':id', component: CustomerFormComponent }
];