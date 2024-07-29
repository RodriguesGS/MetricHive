import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { municipios } from './cidades'; 

type Estado = 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  selectedState: Estado | '' = '';
  cities: string[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    if (!this.data.type) {
      this.data.type = 'juridico';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onStateChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedState = target.value as Estado;
    this.cities = municipios[this.selectedState] || [];
  }

  consultar(): void {
    if (this.data.type === 'juridico' && this.data.cnpj) {
      this.consultarCNPJ(this.data.cnpj);
    } else {
      console.error('Dados insuficientes para consulta.');
    }
  }

  consultarCNPJ(cnpj: string): void {
    const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;
    this.http.get(url).subscribe((response: any) => {
      this.data.razaoSocial = response.nome;
      this.data.nomeFantasia = response.fantasia;
      this.data.logradouro = response.logradouro;
      this.data.bairro = response.bairro;
      this.data.cep = response.cep;
      this.data.telefone = response.telefone;
      this.data.complemento = response.complemento;
      // Adicione outros campos conforme necessário
    }, error => {
      console.error('Erro ao consultar CNPJ:', error);
    });
  }
}
