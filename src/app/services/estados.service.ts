import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';


const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

@Injectable({ providedIn: 'root' })
export class EstadosService {
  constructor(private httpClient: HttpClient) { }

  listar(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(url);
  }

}
