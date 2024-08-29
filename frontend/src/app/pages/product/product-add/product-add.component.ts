import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { ProductDTO } from '../../../models/product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  standalone: true,
  imports: [FormsModule]  // Add FormsModule here
})
export class ProductAddComponent {
  product: ProductDTO = { id: 0, name: '', price: 0, status: true };

  constructor(private productService: ProductService, private router: Router) {}

  onSaveProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      () => this.router.navigate(['/product']),
      (error) => console.error(error)
    );
  }
}
