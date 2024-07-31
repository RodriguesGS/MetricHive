import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Cliente } from './client';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { ClientService } from './client.service';

const LOCAL_STORAGE_KEY = 'clientes';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nomeRazaoSocial', 'cpfCnpj', 'ufCidade', 'number'];
  dataSource: Cliente[] = [];
  selectedTab: 'juridico' | 'fisico' = 'juridico'; // Defina o tipo padrão


  constructor(private clientService: ClientService, public dialog: MatDialog) {}

  ngOnInit() {
    this.clientService.clientes$.subscribe(clientes => {
      this.dataSource = clientes;
    });
  }
  

  get filteredDataSource() {
    return this.dataSource.filter(cliente => cliente.type === this.selectedTab);
  }

  switchTab(tab: 'juridico' | 'fisico') {
    this.selectedTab = tab;
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '1000px',
      data: { type: this.selectedTab } // Passa o tipo selecionado atualmente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dados recebidos do diálogo:', result);
        result.id = this.getNextId(result.type);
        if (result.type === 'juridico' && result.cnpj) {
          result.cnpj = this.formatCNPJ(String(result.cnpj));
        }

        const uf = result.uf ? result.uf.toUpperCase() : ''; 
        const cidade = result.cidade ? this.capitalize(result.cidade) : ''; 
        result.ufCidade = `${uf} / ${cidade}`;
        result.number = result.contato || ''; 
        this.addClient(result);
      }
    });
  }

  openEditClientDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '1000px',
      data: { ...cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.delete) {
          this.confirmDeleteClient(result.id);
        } else {
          this.updateClient(result);
        }
      }
    });
  }

  confirmDeleteClient(id: number): void {
    const dialogRef = this.dialog.open(DeleteClientComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient(id);
      }
    });
  }

  getNextId(tipo: 'juridico' | 'fisico'): number {
    const clientes = this.dataSource.filter(cliente => cliente.type === tipo);
    return clientes.length ? Math.max(...clientes.map(cliente => cliente.id)) + 1 : 1;
  }

  addClient(cliente: Cliente): void {
    this.dataSource.push(cliente);
    this.saveToLocalStorage();
    this.dataSource = [...this.dataSource];
  }

  updateClient(cliente: Cliente): void {
    const index = this.dataSource.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.dataSource[index] = cliente;
      this.saveToLocalStorage();
      this.dataSource = [...this.dataSource];
    }
  }

  deleteClient(id: number): void {
    this.dataSource = this.dataSource.filter(c => c.id !== id);
    this.saveToLocalStorage();
  }

  getClienteCpfCnpj(cliente: Cliente): string {
    return cliente.type === 'juridico' ? cliente.cnpj : this.formatCPF(cliente.cpf);
  }

  getClienteNomeRazaoSocial(cliente: Cliente): string {
    return cliente.type === 'juridico' ? cliente.razaoSocial : cliente.nome;
  }

  private formatCNPJ(cnpj: string): string {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }

  private formatCPF(cpf: string | number): string {
    if (!cpf) {
      return ''; // Retorna uma string vazia se o CPF for undefined ou null
    }
    
    const cpfStr = String(cpf); // Converte o CPF para string, se não for
    return cpfStr.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }
  
  private capitalize(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }

  private saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.dataSource));
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      this.dataSource = JSON.parse(data);
    } else {
      this.dataSource = [];
    }
  }
}
