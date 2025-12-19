import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IArticle } from '@interfaces/article.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-article-preview',
  imports: [RouterLink],
  templateUrl: './article-preview.html',
  styleUrl: './article-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ArticlePreview {
  data = input.required<IArticle>();
}
