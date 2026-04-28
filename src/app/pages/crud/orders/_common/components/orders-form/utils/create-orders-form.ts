import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";

export const formOptions: AbstractControlOptions = {
  updateOn: 'change'
};

export const createOrderForm = (fb: FormBuilder): FormGroup => fb.group({
  id: '',
  user_id: '',
  email: ['', [Validators.email, Validators.maxLength(50)]],
  name: ['', [Validators.maxLength(90)]],
  phone: ['', [Validators.maxLength(20)]],
  order_details: [null],
  isDraft: null,
  created_at: [{value: '', disabled: true}],
  updated_at: [{value: '', disabled: true}],
  deleted_at: [{value: '', disabled: true}]
}, formOptions);
