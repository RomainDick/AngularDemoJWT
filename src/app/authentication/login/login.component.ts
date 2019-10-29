import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../authentication.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error = '';
    hide = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = new FormGroup( {
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    hasError(controlName: string, errorName: string) {
        return this.loginForm.controls[controlName].hasError(errorName);
    }

    // convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authenticationService.login(this.f.username.value, this.f.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(["/"]);
                    },
                    error => {
                        this.error = error;
                    });
        }
    }
}
