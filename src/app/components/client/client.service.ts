import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from './client';

const LOCAL_STORAGE_KEY = 'clientes';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  getClients(): Cliente[] {
    return this.clientesSubject.getValue();
  }

  getClientCount(): number {
    return this.clientesSubject.getValue().length;
  }

  addClient(cliente: Cliente): void {
    const updatedClients = [...this.getClients(), cliente];
    this.saveToLocalStorage(updatedClients);
    this.clientesSubject.next(updatedClients);
  }

  updateClient(cliente: Cliente): void {
    const updatedClients = this.getClients().map(c => c.id === cliente.id && c.type === cliente.type ? cliente : c);
    this.saveToLocalStorage(updatedClients);
    this.clientesSubject.next(updatedClients);
  }

  deleteClient(id: number, type: 'juridico' | 'fisico'): void {
    console.log(`Tentando excluir cliente com ID: ${id} Tipo: ${type}`);
    const updatedClients = this.getClients().filter(cliente => !(cliente.id === id && cliente.type === type));
    console.log('Clientes restantes:', updatedClients);
    this.saveToLocalStorage(updatedClients);
    this.clientesSubject.next(updatedClients);
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const clientes = JSON.parse(data) as Cliente[];
      this.clientesSubject.next(clientes);
    } else {
      this.clientesSubject.next([]);
    }
  }

  private saveToLocalStorage(clientes: Cliente[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clientes));
  }
}
