import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(private http: HttpClient) {}

  consultarCNPJ(cnpj: string): Observable<any> {
    const url = `./api/cnpj/${cnpj}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro ao consultar CNPJ:', error);
    return throwError(() => new Error('Erro ao consultar CNPJ. Tente novamente mais tarde.'));
  }
}
