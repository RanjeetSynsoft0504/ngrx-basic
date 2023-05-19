import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';
import { getUserCreateError } from './../../../store/selectors/user.selectors';
import { catchError, skipWhile, take } from 'rxjs/operators';
import { createUser, loadUsers } from './../../../store/actions/user.action';
import { User } from './../../../models/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  dddd: any
  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
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
    // this.store.select(getUserCreateError).pipe(take(1)).subscribe((error) => {
    //   if (error) {
    //     alert(error);
    //   }
    // });

    this.store.select(getUserCreateError)
    .pipe(skipWhile((error) => error === null))
    .subscribe((error) => {
      if (error) {
        this.alertService.success(error);
      }
    });
  }
}

