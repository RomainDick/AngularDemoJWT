import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../authentication.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	submitted = false;
	error = '';

	constructor(
		private formBuilder: FormBuilder,
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
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			mail: ['', Validators.required, Validators.email],
			password: ['', Validators.required],
			repeatPassword: ['', Validators.required],
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
	    this.submitted = true;

	    // stop here if form is invalid
	    if (this.registerForm.invalid) {
	        return;
	    }

	    this.authenticationService.register(this.f.username.value, this.f.mail.value, this.f.password.value)
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
