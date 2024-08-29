import { Routes } from "@angular/router";
import { InvoiceComponent } from "./invoice-list/invoice.component";
import { InvoiceAddComponent } from "./invoice-add/invoice-add.component";
import { InvoiceDetailComponent } from "./invoice-detail/invoice-detail.component";
import { InvoiceEditComponent } from "./invoice-edit/invoice-edit.component";

export const invoiceRoutes: Routes = [
    { path: '', component: InvoiceComponent },
    { path: 'add', component: InvoiceAddComponent },
    { path: ':id', component: InvoiceDetailComponent },
    { path: 'edit/:id', component: InvoiceEditComponent },
];