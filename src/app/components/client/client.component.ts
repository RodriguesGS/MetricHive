import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Cliente, ClientJuridico, ClientFisico } from './client';
import { AddClientComponent } from './add-client/add-client.component';

const ELEMENT_DATA: Cliente[] = [
  { id: 1, type: 'juridico', razaoSocial: 'Empresa Juridica 1', cnpj: '00.000.000/0001-00', ufCidade: 'PR / Maringá', number: '11 91234-5678' },
  { id: 2, type: 'juridico', razaoSocial: 'Empresa Juridica 2', cnpj: '00.000.000/0002-00', ufCidade: 'PR / Maringá', number: '11 91234-5678' },
  { id: 1, type: 'fisico', nome: 'Cliente Fisico 1', cpf: '000.000.000-00', ufCidade: 'PR / Maringá', number: '11 91234-5678' }
];

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
    AddClientComponent
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  displayedColumns: string[] = ['id', 'nomeRazaoSocial', 'cpfCnpj', 'ufCidade', 'number'];
  dataSource = ELEMENT_DATA;
  selectedTab: 'juridico' | 'fisico' = 'juridico';

  constructor(public dialog: MatDialog) {}

  get filteredDataSource() {
    return this.dataSource.filter(cliente => cliente.type === this.selectedTab);
  }

  switchTab(tab: 'juridico' | 'fisico') {
    this.selectedTab = tab;
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '600px',
      data: { type: this.selectedTab }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.getNextId(result.type);
        this.addClient(result);
      }
    });
  }

  getNextId(tipo: 'juridico' | 'fisico'): number {
    const clientes = this.dataSource.filter(cliente => cliente.type === tipo);
    return clientes.length ? Math.max(...clientes.map(cliente => cliente.id)) + 1 : 1;
  }

  addClient(cliente: Cliente): void {
    this.dataSource.push(cliente);
    this.dataSource = [...this.dataSource];
  }

  getClienteCpfCnpj(cliente: Cliente): string {
    return cliente.type === 'juridico' ? cliente.cnpj : cliente.cpf;
  }

  getClienteNomeRazaoSocial(cliente: Cliente): string {
    return cliente.type === 'juridico' ? cliente.razaoSocial : cliente.nome;
  }
}
