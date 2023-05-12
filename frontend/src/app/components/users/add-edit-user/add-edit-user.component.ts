import { getUserCreateError } from './../../../store/selectors/user.selectors';
import { catchError } from 'rxjs/operators';
import { createUser } from './../../../store/actions/user.action';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userCreateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ userCreate: User }>
  ) {}

  ngOnInit(): void {
    this.userCreateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.userCreateForm.invalid) {
      return;
    }

    const user: User = {
      ...this.userCreateForm.value,
    };

    this.store.dispatch(createUser({ user }));
    this.store.select(getUserCreateError).pipe(
      catchError((error) => {
        console.log('Error creating user:', error);
        return of(null);
      })
    ).subscribe((error) => {
      console.log(typeof error);
      if (!error) {
        this.userCreateForm.reset();
      }
    });
  }
}

