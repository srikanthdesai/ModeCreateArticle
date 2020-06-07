import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '@app/_models/article';
import {ArticleService} from '../_services/article.service';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  model: Article = new Article();

  constructor(private articleService: ArticleService,private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() 
  {
    this.articleService.addArticle(this.model)
    .subscribe((result) => {
      this.router.navigate([' '], );
    });
  }

}
