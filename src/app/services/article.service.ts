import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: any[] = [];
  private articlesSubject = new Subject<any[]>(); //Creamos el observable para emitir cambios

  constructor() { }
  //Añadimos los métodos para obervar y obtener artículos, añadir, modificar, actualizar y eliminar

  getArticles(): Observable<any[]> {
    return this.articlesSubject.asObservable();
  }
  addArticle(article:any): void {
    this.articles.push(article); //usamos push para añadir
    this.articlesSubject.next(this.articles);
  }
  /**Este método de update de momento no se usa, pero lo dejo por si en un futuro fuera necesario */
  updateArticle(index:number, updateArticle: any): void {
    this.articles[index] = updateArticle;
    this.articlesSubject.next(this.articles);
  }
  deleteArticle(index: number): void {
    this.articles.splice(index, 1); //usamos slice para eliminar del array
    this.articlesSubject.next(this.articles);
  }
/** Muevo la lógica del componente al Servicio*/
  onQuantityChange(articleID: number, changeInQuantity: number): void {
      const index = this.articles.findIndex((article) => article.id === articleID);  
      if (index !== -1) {
        this.articles[index].quantityInCart += changeInQuantity;
        this.articlesSubject.next(this.articles);
        console.log(`Cantidad de ${this.articles[index].name}: ${this.articles[index].quantityInCart}`);
      }
    }

}
