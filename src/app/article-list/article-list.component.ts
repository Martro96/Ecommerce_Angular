import { Component } from '@angular/core';
import { Article } from '../article-item/article-item.interface';
import { ArticleItemComponent, ArticleQuantityChange } from '../article-item/article-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true, 
  imports: [CommonModule, ArticleItemComponent],
  templateUrl: './article-list.component.html', /*Esto según el ejercicio 7 debería estar en un template en línea pero lo he puesto así para entender el error del renderizado*/
  styleUrl: './article-list.component.css',
})

export class ArticleListComponent {
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

  trackById(index: number, item: Article): number {
    return item.id; // Usamos 'id' para identificar de forma única cada producto
  }

  // Traspaso de la lógica de aumento y reducción de productos a este componente: 
  onQuantityChange(event: ArticleQuantityChange): void {
    const { article, change } = event;
    const index = this.products.findIndex((p) => p.id === article.id);  // Cambié por 'id'
    if (index !== -1) {
      this.products[index].quantityInCart += change;
      console.log(`Cantidad de ${this.products[index].name}: ${this.products[index].quantityInCart}`);
    }
  }

}