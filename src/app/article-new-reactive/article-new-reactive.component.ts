import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { Article } from '../article-item/article-item.interface';


export function NameArticleValidator(control: AbstractControl): ValidationErrors | null {
  const forbiddenNames = ['Prueba', 'Test', 'Mock', 'Fake'];
  return forbiddenNames.includes(control.value) ? { forbiddenName: true } : null;
}
@Component({
  selector: 'app-article-new-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './article-new-reactive.component.html',
  styleUrl: './article-new-reactive.component.css'
})


export class ArticleNewReactiveComponent  {
    articleForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService) { //Añado articleService al constructor
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, NameArticleValidator]],
      price: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0.1)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/[\w.-]+(\.[a-z]{2,3})+/)]],
      onSale: [false],
  })}

  addArticle(): void {
    if (this.articleForm.valid) {
      const newArticle: Article = {
        ...this.articleForm.value,
        isOnSale: this.articleForm.value.onSale ?? false, // Valor por defecto en caso de que falte
        quantityInCart: 0, // nos asegura que inicie siempre en 0
        id: Date.now(), // Usamos `Date.now()` como ID temporal para no duplicar artículos
      };
      this.articleService.create(newArticle);
      this.articleForm.reset({
        onSale: false, // Reseteamos con valores por defecto
      });
      console.log('Artículo añadido correctamente: ', newArticle);
    } else {
      console.log('Formulario inválido');
    }
  } 

  onSubmit(): void { 
    this.addArticle();
  }

}