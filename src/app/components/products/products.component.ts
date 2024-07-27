import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AddProductsComponent } from "./add-products/add-products.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteProductsComponent } from './delete-products/delete-products.component';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'ncm', 'price', 'actions'];

  constructor(public dialog: MatDialog) {}

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
        this.addItem(result);
      }
    });
  }

  openEditDialog(product: any, index: number): void {
    const dialogRef = this.dialog.open(AddProductsComponent, {
      width: '500px',
      data: { title: 'Editar Item', product, index }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateItem(result, index);
      }
    });
  }

  openDeleteDialog(product: any, index: number): void {
    const dialogRef = this.dialog.open(DeleteProductsComponent, {
      width: '500px',
      data: { title: 'Excluir Item', product, index }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(index);
      }
    });
  }

  loadItems() {
    const storedItems = localStorage.getItem('produtos');
    if (storedItems) {
      this.products = JSON.parse(storedItems);
    } else {
      this.products = [
        { id: 1, name: 'Item teste', ncm: '99999999', price: 10.00 },
        { id: 2, name: 'Pão de queijo', ncm: '19012020', price: 5.50 },
        { id: 3, name: 'Água mineral', ncm: '22011000', price: 2.00 }
      ];
      this.saveItems();
    }
  }

  saveItems() {
    localStorage.setItem('produtos', JSON.stringify(this.products));
  }

  addItem(item: any) {
    const newItem = {
      id: this.products.length + 1,
      ...item
    };
    this.products.push(newItem);
    this.saveItems();
  }

  updateItem(item: any, index: number) {
    this.products[index] = { ...this.products[index], ...item };
    this.saveItems();
  }

  deleteItem(index: number) {
    this.products.splice(index, 1);
    this.saveItems();
  }
}