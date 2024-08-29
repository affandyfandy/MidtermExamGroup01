import { Component } from '@angular/core';
import { AddCustomerReqeust, Customer } from '../../../models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatLabel,
    MatSnackBarModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class CustomerFormComponent {
  customer: Customer = {
    id: "", name: '', phoneNumber: '', status: 'ACTIVE', createdTime: new Date(), updatedTime: new Date()
  };

  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== 'create') {
      this.isEditMode = true;
      this.customerService.getCustomerById(id).subscribe(data => {
        this.customer = data;
      });
    }
  }

  onSubmit() {
    if (this.customer.name && this.customer.phoneNumber) {
      if (this.isEditMode) {
        this.customerService.updateCustomer(this.customer).subscribe(() => {
          this.showSnackbar('Customer updated successfully')
        }, error => {
          this.showSnackbar("Failed to update customer")
        });
      } else {
        let request: AddCustomerReqeust = {
          name: this.customer.name,
          phoneNumber: this.customer.phoneNumber,
          status: this.customer.status
        }
        this.customerService.addCustomers(request).subscribe(() => {
          this.showSnackbar('Customer created successfully')
        }, error => {
          this.showSnackbar("Failed to create customer")
        });
      }
    }
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,

    });
  }

  onCancel() {
    this.router.navigate([`/customer`]);
  }
}
