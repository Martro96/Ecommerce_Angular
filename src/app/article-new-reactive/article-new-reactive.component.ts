import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ArticleService } from '../services/article.service';

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


export class ArticleNewReactiveComponent {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService) { //Añado articleService al constructor
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, NameArticleValidator]],
      price: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0.1)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/[\w.-]+(\.[a-z]{2,3})+/)]],
      onSale: [false],
  })}
  
  addArticle():void {
    if (this.articleForm.valid) {
      this.articleService.addArticle(this.articleForm.value);
      this.articleForm.reset();
    }
  }
  onSubmit() {
    if (this.articleForm.valid) {
      console.log('Formulario válido: ', this.articleForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

}
