import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Estado, municipios } from '../add-client/cidades';

@Component({
  selector: 'app-edit-client',
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
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  selectedState: Estado | null = null;
  cities: string[] = [];
  estados: Estado[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    public dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.selectedState = data.uf;
    this.updateCities();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onStateChange(state: Estado): void {
    this.selectedState = state;
    this.updateCities();
  }

  updateCities(): void {
    if (this.selectedState) {
      this.cities = municipios[this.selectedState] || [];
      this.data.cidade = this.cities.includes(this.data.cidade) ? this.data.cidade : '';
    }
  }

  save(): void {
    this.dialogRef.close(this.data);
  }

  delete(): void {
    this.dialogRef.close({ delete: true, id: this.data.id });
  }
}
