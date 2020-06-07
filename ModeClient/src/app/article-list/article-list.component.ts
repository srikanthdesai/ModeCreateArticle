import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../_services/article.service';
import { Article } from '@app/_models/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.less']
})
export class ArticleListComponent implements OnInit {

  articles = [];

  constructor(private articleService: ArticleService ) { }

  ngOnInit(): void {
    this.articleService.getArticles()
    .subscribe((result: any) => {
      this.articles = result.data;
      console.log(this.articles);
    });
  }

}
