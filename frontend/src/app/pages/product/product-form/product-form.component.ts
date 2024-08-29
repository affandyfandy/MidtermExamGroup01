import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    status: 'ACTIVE',
    createdTime: new Date(),
    updatedTime: new Date()
  };

  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== 'create') {
      this.isEditMode = true;
      this.productService.getProductById(+id).subscribe(data => {
        this.product = data;
      });
    }
  }

  onSubmit() {
    if (this.product.name && this.product.price) {
      if (this.isEditMode) {
        this.productService.updateProduct(+this.product.id, this.product).subscribe(() => {
          this.showSnackbar('Product updated successfully');
          this.router.navigate(['/product']);
        }, error => {
          this.showSnackbar("Failed to update product");
        });
      } else {
        this.productService.addProduct(this.product).subscribe(() => {
          this.showSnackbar('Product created successfully');
          this.router.navigate(['/product']);
        }, error => {
          this.showSnackbar("Failed to create product");
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
    this.router.navigate([`/product`]);
  }
}
