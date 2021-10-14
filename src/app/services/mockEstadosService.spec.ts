
import { TestBed, waitForAsync } from "@angular/core/testing";
import { Observable, of, throwError } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { By } from "@angular/platform-browser";

import { AppComponent } from "../app.component";
import { EstadosService } from "./estados.service";

let mockEstadosServiceData: any = null;

class MockEstadosService{
  listar(): Observable<any[]>{
    return mockEstadosServiceData;
  }
}

describe('AppComponent', () =>{
  beforeEach(waitForAsync(() =>{
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
      ],
      declarations:[
        AppComponent,
      ],
      providers:[
        //Aqui dizemos ao Angular que toda vez que EstadosService
      //for solicitado, será entregue a classe MockEstadosService
      {provide: EstadosService, useClass: MockEstadosService}
      ]
    }).compileComponents();
  }));

    it('should create the app', () =>{
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
});
    it('deve renderizar a lista de estadps', () =>{
      const fixture = TestBed.createComponent(AppComponent);

      //Mock do retorno da service(MockEstadosService)
      const dadosMockados = [
        {sigla: 'Te', nome: 'Teste'}
      ];

      //Preenchemos o mockEstadosService para que 
      //a classe MockEStadosService possa retornar
      // o valor ao app.component.ts
      // o 'of' retorna um Observable exatamente como HttpClient.get

      mockEstadosServiceData = of(dadosMockados);

      fixture.detectChanges();
      const celulasDaTabela = fixture.debugElement
      .queryAll(By.css('td'));

      //Esperamos encontrar estrututa HTML quando a pagina for renderizada
      //<table>
      //<tr>
      //<td>Te<td>
      //<td>Teste</td>
      //</tr>
      //</table>

      expect(celulasDaTabela[0].nativeElement.innerHTML)
      .toBe(dadosMockados[0].sigla);

      expect(celulasDaTabela[1].nativeElement.innerHTML)
      .toBe(dadosMockados[0].nome);
    });

    it('deve renderizar a mensagem de erro', () =>{
      const fixture = TestBed.createComponent(AppComponent);

      //Mockamos um erro, simulando que houve falha na requisição
      mockEstadosServiceData = throwError('teste unitario erro');

      fixture.detectChanges();
      const divTemplateErro = fixture.debugElement
      .query(By.css('div.erro'));

      //Esperamos encontrar estrututa HTML
      // <div class ="erro">
      // Ocorreu um erro inesperado
      //</div>

      expect(divTemplateErro.nativeElement.innerHTML)
      .toMatch(/Ocorreu um erro inesperado!!/);
    });
})