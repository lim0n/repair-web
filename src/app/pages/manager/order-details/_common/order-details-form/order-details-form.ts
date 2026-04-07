import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from '@app/services/breadcrumbs.service';
import { OrderDetailsService } from '@app/services/order-details.service';
import { PopupService } from '@app/services/popup.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import { IOrderDetails } from '@interfaces/order-details.interface';
import { datetimeTzToDatetimeLocal } from '@pages/manager/users/user/utils/datetimetz-to-datetime-local.function';
import { BehaviorSubject, catchError, filter, map, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'order-details-form',
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './order-details-form.html',
  styleUrl: './order-details-form.scss',
  host: { class: 'order-details-form' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OrderDetailsFormComponent implements OnInit {
  orderDetailsItem$$ = new BehaviorSubject<IOrderDetails | null>(null)
  orderDetailsForm!: FormGroup;
  serverError = false;
  orderDetailsId!: string;

  constructor(
    private _orderDetailsService: OrderDetailsService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _breadcrumbsService: BreadcrumbsService,
    private _router: Router,
    private _popupService: PopupService
  ) { }

  readonly keepJsonOrder = keepJsonOrder;

  ngOnInit(): void {

    if (this._route.snapshot.paramMap.get('id') !== null) {
      this.orderDetailsId = String(this._route.snapshot.paramMap.get('id'));
    };

    const formOptions: AbstractControlOptions = {
      updateOn: 'change'
    };

    this.orderDetailsForm = this._fb.group({
      id: [{value: '', disabled: true}],
      order_id: [{value: ''}, [Validators.required]],
      
      // details: [{value: ''}, [Validators.required]],

      // details: [{value: ''}, [ Validators.required ]],
      details: ['', [Validators.required]],
      
      author: [{value: ''}, [Validators.required]],
      hidden: false,
      created_at: [{value: '', disabled: true}],
      updated_at: [{value: '', disabled: true}],
      deleted_at: [{value: '', disabled: true}]
    }, formOptions);

    this.orderDetailsItem$$
      .pipe(
        filter(val => val != null),
        map(data => {
          if (data.created_at && typeof data.created_at === 'string') {
            data.created_at = datetimeTzToDatetimeLocal(data.created_at)
          }
          if (data.updated_at && typeof data.updated_at === 'string') {
            data.updated_at = datetimeTzToDatetimeLocal(data.updated_at)
          }
          return data;
        }))
      .subscribe(data => {
        console.warn('patchValue', data);
        this.orderDetailsForm.patchValue(data);
        
        const title = data.author;
        if (title) this._breadcrumbsService.changeLastTitle(String(title));
      });

    if (this.orderDetailsId) {
      console.warn('if this.orderDetailsId', this.orderDetailsId);
      this._orderDetailsService.getOrderDetailsById(String(this.orderDetailsId))
        .pipe(
          take(1),
          catchError(error => {
            this.serverError = error;
            return of(error);
          }),
        )
        .subscribe((data) => {
          this.orderDetailsItem$$.next(data);
        });
    }
  }

  onSubmit(): void {
    if (this.orderDetailsForm.valid) {
      const formData = this.orderDetailsForm.value;
      console.warn('formData', formData);
      if (this.orderDetailsId) {
        this._orderDetailsService.updateOrderDetails(this.orderDetailsId, formData)
          .subscribe({
            next: (response) => {
              console.warn('Item updated successfully', response);
              this._router.navigate(['..'], {relativeTo: this._route});
            },
            error: (error) => {
              console.error('Error updating item', error);
            }
          });
      }
      else {
        this._orderDetailsService.createOrderDetails(formData)
          .subscribe({
            next: (response) => {
              console.warn('Item create successfully', response);
              this._router.navigate(['..', response.id], {relativeTo: this._route});
            },
            error: (error) => {
              console.error('Error creating item', error);
            }
          });
      }
    }
  }

  onDelete() {

    this._popupService.confirm('Удалить заказ?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          // The inner observable (HTTP request) is only subscribed to if the filter passes
          return this._orderDetailsService.deleteOrderDetails(this.orderDetailsId)
        })
      )
      .subscribe({
        next: (response) => {
          console.warn('Item deleted successfully', response);
          // Redirect or show a success message
          // this.user$$.next(response);
        },
        error: (error) => {
          console.error('Error deleting item', error);
        }
      });
  }
}
