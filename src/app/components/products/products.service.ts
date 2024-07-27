import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  ncm: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [];

  constructor() {
    this.loadItems();
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductCount(): number {
    return this.products.length;
  }

  addProduct(product: Product) {
    const newProduct = { ...product, id: this.products.length + 1 };
    this.products.push(newProduct);
    this.saveItems();
  }

  updateProduct(product: Product, index: number) {
    this.products[index] = { ...this.products[index], ...product };
    this.saveItems();
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.saveItems();
  }

  private loadItems() {
    const storedItems = localStorage.getItem('produtos');
    if (storedItems) {
      this.products = JSON.parse(storedItems);
    } else {
      this.products = [
        { id: 1, name: 'Item teste', ncm: '99999999', price: 10.0 },
        { id: 2, name: 'Pão de queijo', ncm: '19012020', price: 5.5 },
        { id: 3, name: 'Água mineral', ncm: '22011000', price: 2.0 },
      ];
      this.saveItems();
    }
  }

  private saveItems() {
    localStorage.setItem('produtos', JSON.stringify(this.products));
  }
}
