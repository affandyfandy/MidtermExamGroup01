import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { ProductDTO } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductDTO[] = [];
  search = '';
  sortBy = 'name';
  sortDir = 'asc';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts(this.search, this.sortBy, this.sortDir).subscribe(
      (data) => this.products = data,
      (error) => console.error(error)
    );
  }

  onAddProduct(): void {
    this.router.navigate(['/product/add']);
  }

  onEditProduct(id: number): void {
    this.router.navigate([`/product/edit/${id}`]);
  }

  onActivateProduct(id: number): void {
    this.productService.activateProduct(id).subscribe(
      () => this.getProducts(),
      (error) => console.error(error)
    );
  }

  onDeactivateProduct(id: number): void {
    this.productService.deactivateProduct(id).subscribe(
      () => this.getProducts(),
      (error) => console.error(error)
    );
  }

  onImportProducts(event: any): void {
    const file = event.target.files[0];
    this.productService.importProducts(file).subscribe(
      () => this.getProducts(),
      (error) => console.error(error)
    );
  }
}
