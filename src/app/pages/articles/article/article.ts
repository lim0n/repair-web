import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
  
})
export class Article {
  route: ActivatedRoute = inject(ActivatedRoute);
  articleName = 'noname';
  constructor() {
    this.articleName = this.route.snapshot.params['name'];
  }
}
