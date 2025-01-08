import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Article } from '../article-item/article-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly API_URL = 'http://localhost:3000/api/articles';
  private articlesSubject = new BehaviorSubject<Article[]>([
    {
      id: 1,
      name: 'Zanahoria',
      imageUrl: 'https://soycomocomo.es/media/2019/03/zanahorias.jpg',
      price: 1,
      isOnSale: true,
      quantityInCart: 5,
    },
    {
      id: 2,
      name: 'Tomate',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQj7Sc0I1cZ7uPRrqFqaH7PwZqTaHCp6p49w&s',
      price: 2,
      isOnSale: false,
      quantityInCart: 0,
    },
    {
      id: 3,
      name: 'Judías blancas',
      imageUrl: 'https://i.ytimg.com/vi/SOpiQ4ksFdY/maxresdefault.jpg',
      price: 2,
      isOnSale: true,
      quantityInCart: 0,
    }
  ])

  constructor(private http: HttpClient) { } //aplicamos para hacer peticiones http

  getArticles(): Observable<Article[]> {
    //return this.articlesSubject.asObservable();
    return this.http.get<Article[]>(this.API_URL); //Cambiamos para que la petición se le haga al servidor 
  }

  /*create(article: Article): Observable<any> {
    const currentArticles = this.articlesSubject.value;
    const updatedArticles = [...currentArticles, article];
    this.articlesSubject.next(updatedArticles); 
    return new BehaviorSubject(article).asObservable();
  }
    deleteArticle(articleID: number): void {
    const currentArticles = this.articlesSubject.value;
    const updatedArticles = currentArticles.filter((article) => article.id !== articleID) //usamos filter para no modificar el array original 
    this.articlesSubject.next(updatedArticles);
  }
    
  onQuantityChange(articleID: number, changeInQuantity: number): void {
    const currentArticles = this.articlesSubject.value;
    const updatedArticles = currentArticles.map((article) => { //usamos map para crear un nuevo array y modificar sólo el que coincida con el id
        if (article.id === articleID) {
          return {
            ...article,
            quantityInCart: Math.max(0, article.quantityInCart + changeInQuantity), 
          };
        }
        return article;
      });
      this.articlesSubject.next(updatedArticles);
    }*/
  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.API_URL, article);
  }

  deleteArticle(articleID: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${articleID}`);
  }

  onQuantityChange(articleID: number, changeInQuantity: number): Observable<Article> {
    return this.http.patch<Article>(`${this.API_URL}/${articleID}`, {changeInQuantity});
  }
  
}
