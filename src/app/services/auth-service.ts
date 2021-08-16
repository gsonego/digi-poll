import { Injectable } from "@angular/core";

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public auth: AngularFireAuth) {
    }

    login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider);
    }

    logout() {
        return this.auth.signOut();
    }
}