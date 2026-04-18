import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SERVICE_PRODUCTS } from './product-collage.config';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IEntity } from '@interfaces/entity.interface';
import { WhatWeDo } from '@components/content/what-we-do/what-we-do';

@Component({
  selector: 'product-collage',
  imports: [
    WhatWeDo
  ],
  templateUrl: './product-collage.html',
  styleUrl: './product-collage.scss',
  host: { class: 'product-collage' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCollage implements OnInit, OnDestroy {
  readonly products = SERVICE_PRODUCTS;
  readonly path$ = new Subject<string>();
  product: IEntity<IEntity[]> | undefined;

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.path$.subscribe(data => {
      this.product = this.getProductByPath(data);
    })

    this._route.url
      .subscribe((data) => {
        this.path$.next(data.length ? data[0].path : '');
      });
  }

  getProductByPath(path: string) {
    return this.products.find(product => product.route === path)
  }

  ngOnDestroy(): void {
  }
}
