import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: any[] = [];
  private articlesSubject = new Subject<any[]>(); //Creamos el observable para emitir cambios

  constructor() { }
  //Añadimos los métodos

  getArticles(): Observable<any[]> {
    return this.articlesSubject.asObservable();
  }
  addArticle(article:any): void {
    this.articles.push(article); //usamos push para añadir
    this.articlesSubject.next(this.articles);
  }
  updateArticle(index:number, updateArticle: any): void {
    this.articles[index] = updateArticle;
    this.articlesSubject.next(this.articles);
  }
  deleteArticle(index: number): void {
    this.articles.splice(index, 1); //usamos slice para eliminar del array
    this.articlesSubject.next(this.articles);
  }

}
