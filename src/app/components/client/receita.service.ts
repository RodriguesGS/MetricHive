import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceitaService {
  private apiUrl = 'https://www.receitaws.com.br/v1/cnpj/';

  constructor(private http: HttpClient) {}

  getCnpjData(cnpj: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${cnpj}`);
  }
}
