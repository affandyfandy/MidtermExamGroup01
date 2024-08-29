import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProductDTO } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  standalone: true,
  imports: [FormsModule]  // Add FormsModule here
})
export class ProductEditComponent implements OnInit {
  product: ProductDTO = { id: 0, name: '', price: 0, status: true };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(
      (data) => (this.product = data),
      (error) => console.error(error)
    );
  }

  onSaveProduct(): void {
    this.productService.editProduct(this.product.id, this.product).subscribe(
      () => this.router.navigate(['/product']),
      (error) => console.error(error)
    );
  }
}
