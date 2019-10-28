import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/models';
import { AuthenticationService } from './authentication/services';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    constructor() {
    }
}