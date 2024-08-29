import { Component } from '@angular/core';
import { Customer } from '../../../models/customer.model';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.getCustomerById(+id).subscribe(data => {
        this.customer = data;
      });
    }
  }
}
