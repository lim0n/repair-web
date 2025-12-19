import { Injectable } from '@angular/core';
import { IArticle } from '@interfaces/article.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Articles {

  protected mock: IArticle[] = [
    {
      title: '',
      description: '',
      content: ''
    }
  ];

  getArticles(): Observable<IArticle[]> {
    return of(this.mock);
  }
}
