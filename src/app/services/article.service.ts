import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Article } from '../article-item/article-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  //Traemos la lista de artículos al Servicio
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

  constructor() { }
  //Añadimos los métodos para obervar y obtener artículos, añadir, actualizar y eliminar

  getArticles(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }
  create(article: Article): Observable<any> {
    const currentArticles = this.articlesSubject.value;
    const updatedArticles = [...currentArticles, article];
    this.articlesSubject.next(updatedArticles); // quitamos push para no modificar el array original 
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
    }
}
