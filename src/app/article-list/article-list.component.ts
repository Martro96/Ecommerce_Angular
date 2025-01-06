import { Component, OnInit } from '@angular/core';
import { Article } from '../article-item/article-item.interface';
import { ArticleItemComponent, ArticleQuantityChange } from '../article-item/article-item.component';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleItemComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})

export class ArticleListComponent implements OnInit { //Indicamos que se implementa al iniciarse
  articles$: Observable<Article[]>; // Declaramos articles como observable al poner $ al final. Indicamos con ello que se emetirán listad de artículos

  // Lista de productos
  products: Article[] = [
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
  ];
  
  //inyectamos el servicio en el constructor
  constructor(private articleService: ArticleService) {
    this.articles$ = this.articleService.getArticles();
  } 

  //Se elimina la lógica de los métodos para pasarlas al Servicio, pero se mantienen como llamada al servicio

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();

  }

  trackById(index: number, item: Article): number {
    return item.id; // este se mantiene igual
  }

  deleteArticle(article: Article): void {
    this.articleService.deleteArticle(article.id);
  }

  onQuantityChange(event: ArticleQuantityChange): void {
    const { article, change } = event; //esta línea la dejamos aqui 
    this.articleService.onQuantityChange(article.id, change); 
  }

}