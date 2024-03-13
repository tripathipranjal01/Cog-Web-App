import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

import { GenericValidator } from '../../shared/validators/generic.validators';
import { ILogin } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  loginForm: FormGroup;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {};
  private genericValidator: GenericValidator;

  fb = inject(FormBuilder);
  store = inject(Store);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      companyName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.validationMessages = {
      email: {
        required: 'Username is required',
      },
      password: {
        required: 'Password is required',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<string>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );
    merge(this.loginForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.loginForm
        );
      });
  }

  onSubmit() {
    const formValues: ILogin = {
      ...this.loginForm.value,
    };
    console.log('🕵️‍♂️ 🥷🏻 : ==> LoginComponent : ==> formValues:', formValues);
    this.store.dispatch(fromStore.loginStart(formValues));
  }
}
