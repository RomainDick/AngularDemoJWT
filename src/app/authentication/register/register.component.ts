import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
	error = '';

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
		this.registerForm = new FormGroup({
			username: new FormControl('', Validators.required),
			mail: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
			repeatPassword: new FormControl('', Validators.required),
		});
	}

	hasError(controlName: string, errorName: string) {
		return this.registerForm.controls[controlName].hasError(errorName);
	}

	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
		if (this.registerForm.valid) {
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
}