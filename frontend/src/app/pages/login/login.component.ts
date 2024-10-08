import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterConfig } from '../../config/app.constants';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public isLoggedIn: boolean = localStorage.getItem('token') != null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/product']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.authService.login(this.loginForm.value.username, this.loginForm.value.password)) {
        this.router.navigate([RouterConfig.PRODUCT.link]);
      } else {
        this.snackBar.open(`Your username & passowrd doesn't match`, 'Close', {
          duration: 3000,
        });
      }
    }
  }
}
