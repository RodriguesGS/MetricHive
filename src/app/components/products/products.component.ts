import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductsService, Product } from '../products/products.service';
import { AddProductsComponent } from "./add-products/add-products.component";
import { DeleteProductsComponent } from './delete-products/delete-products.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'ncm', 'price', 'actions'];

  constructor(public dialog: MatDialog, private productsService: ProductsService) {}

  ngOnInit() {
    this.loadItems();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProductsComponent, {
      width: '500px',
      data: { title: 'Cadastrar Item' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.addProduct(result);
        this.loadItems();
      }
    });
  }

  openEditDialog(product: Product, index: number): void {
    const dialogRef = this.dialog.open(AddProductsComponent, {
      width: '500px',
      data: { title: 'Editar Item', product, index }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.updateProduct(result, index);
        this.loadItems();
      }
    });
  }

  openDeleteDialog(product: Product, index: number): void {
    const dialogRef = this.dialog.open(DeleteProductsComponent, {
      width: '500px',
      data: { title: 'Excluir Item', product, index }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.deleteProduct(index);
        this.loadItems();
      }
    });
  }

  loadItems() {
    this.products = this.productsService.getProducts();
  }
}
