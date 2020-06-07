import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Article } from '../_models/article';
import {AccountService} from '../_services/account.service';
import { User} from '@app/_models';


@Injectable({ providedIn: 'root' })
export class ArticleService {

    user: any;

    constructor(
        private router: Router,
        private http: HttpClient,
        private accountService: AccountService,
    ) {
        this.accountService.user.subscribe((x) => {
            console.log('ArticleUser', x);
            this.user = x;
        });
    }
    

    getArticles() {
        return this.http.get<Article[]>(`${environment.apiUrl}/articles`);
    }

    
    addArticle(article: Article) {
        return this.http.post<Article[]>(`${environment.apiUrl}/articles`, article);
    }

}