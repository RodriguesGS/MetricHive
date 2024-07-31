import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { municipios, Estado } from './cidades'; 

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
export class AddClientComponent implements OnInit {
  selectedState: Estado = 'PR';
  selectedCity: string = 'MARINGA';
  cities: string[] = municipios['PR'];
  estados: Estado[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Certifique-se de que o tipo de cliente seja corretamente inicializado
    if (!this.data.type) {
      this.data.type = 'juridico'; // Defina um valor padrão se `type` não for passado
    }

    if (this.data.uf) {
      this.selectedState = this.data.uf;
      this.updateCities();
      this.selectedCity = this.data.cidade;
    } else {
      this.data.uf = this.selectedState;
      this.data.cidade = this.selectedCity;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onStateChange(state: Estado): void {
    this.selectedState = state;
    this.data.uf = state;
    this.updateCities();
  }

  onCityChange(city: string): void {
    this.selectedCity = city;
    this.data.cidade = city;
  }

  updateCities(): void {
    if (this.selectedState) {
      this.cities = municipios[this.selectedState] || [];
      if (!this.cities.includes(this.data.cidade)) {
        this.data.cidade = this.cities.length > 0 ? this.cities[0] : '';
        this.selectedCity = this.data.cidade;
      }
    }
  }

  consultar(): void {
    if (this.data.type === 'juridico' && this.data.cnpj) {
      this.consultarCNPJ(this.data.cnpj);
    } else {
      console.error('Dados insuficientes para consulta.');
    }
  }

  private consultarCNPJ(cnpj: string): void {
    const url = `./api/cnpj/${cnpj}`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Resposta da API:', response); 
        if (response && response.nome) {
          this.updateClientData(response);
        } else {
          console.error('Resposta inesperada:', response);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao consultar CNPJ:', error);
      },
      complete: () => {
        console.log('Consulta de CNPJ completa.');
      }
    });
  }

  private updateClientData(response: any): void {
    this.data.razaoSocial = response.nome;
    this.data.nomeFantasia = response.fantasia;
    this.data.logradouro = response.logradouro;
    this.data.bairro = response.bairro;
    this.data.cep = response.cep;
    this.data.contato = response.email || response.telefone; 
    this.data.uf = response.uf;
    this.selectedState = response.uf as Estado;
    this.updateCities();
    this.data.cidade = response.municipio;
    this.selectedCity = response.municipio;
    this.data.complemento = response.complemento;
  }

  allFieldsFilled(): boolean {
    if (this.data.type === 'juridico') {
      return this.data.cnpj && this.data.razaoSocial && this.data.contato &&
             this.data.nomeFantasia && this.data.bairro && this.selectedState && this.selectedCity;
    } else {
      return this.data.nome && this.data.cpf && this.data.contato && this.data.bairro && this.selectedState && this.selectedCity;
    }
  }

  onSaveClick(): void {
    if (this.allFieldsFilled()) {
      this.dialogRef.close(this.data);
    } else {
      console.error('Preencha todos os campos obrigatórios.');
    }
  }
}
