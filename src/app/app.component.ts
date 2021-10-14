import { EstadosService } from './services/estados.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented');
  }
  estados: any[] = [];
  ocorreuErro: boolean = false;

  constructor(private estadosService: EstadosService) { }

  ngOnInit() {
    this.estadosService
      .listar()
      .subscribe(
        (listaEstados: any[]) => {
          this.ocorreuErro = false;
          this.estados = listaEstados;
        },
        (error: any) => {
          console.error('Erro ao obter os registros', error);
          this.ocorreuErro = true;
        }
      );


  }
}
