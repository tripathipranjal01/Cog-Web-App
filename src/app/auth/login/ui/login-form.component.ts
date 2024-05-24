import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from '../../../shared/validators/generic.validators';
import { ILogin, carouselData } from '../../interfaces';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, AfterViewInit {
  @Output() submitLogin = new EventEmitter<ILogin>();
  @Input({ required: true }) isSpinner: boolean;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  loginForm: FormGroup;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {};
  private genericValidator: GenericValidator;

  fb = inject(FormBuilder);
  carouselData = carouselData;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.validationMessages = {
      username: {
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
    console.log(formValues);
    this.submitLogin.emit(formValues);
  }
}
