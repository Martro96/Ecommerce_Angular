import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { validateHeaderValue } from 'node:http';


@Component({
  selector: 'app-article-new-template',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './article-new-template.component.html',
  styleUrl: './article-new-template.component.css'
})
export class ArticleNewTemplateComponent {
  articleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/[\w.-]+(\.[a-z]{2,3})+/)]],
      onSale: [false],
  })}
  

  onSubmit() {
    if (this.articleForm.valid) {
      console.log('Formulario válido: ', this.articleForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
