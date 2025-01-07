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

  //inyectamos el servicio en el constructor
  constructor(private articleService: ArticleService) {
    this.articles$ = this.articleService.getArticles();
  } 

  //Se elimina la lógica de los métodos para pasarlas al Servicio, pero se mantienen como llamada al servicio

  ngOnInit(): void {
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