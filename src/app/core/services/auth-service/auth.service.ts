import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user !: User;
  loggedIn: boolean = false;
  dataContextUser: any;

  private _authNavStatusSource = new BehaviorSubject(false);

  authNavStatus$ = this._authNavStatusSource.asObservable();

  authSettings = environment.authSettings;

  settings = {
    authority: this.authSettings.authority,
    client_id: this.authSettings.client_id,
    redirect_uri: this.authSettings.redirect_uri,
    post_logout_redirect_uri: this.authSettings.post_logout_redirect_uri,
    response_type: 'code',
    scope: this.authSettings.scope,
    prompt: 'login',
    client_secret: 'mb-b@ck0ff!ce-ABKYD',
    automaticSilentRenew: true,
  };

  private userManager = new UserManager(this.settings);

  constructor() {
    this.userManager.getUser().then(user => {
      if (user != null) {
        this.user = user;
        this.dataContextUser = this.setUserDetails(this.user);
        this.loggedIn = true;
        this._authNavStatusSource.next(this.isAuthenticated());
      }

    });

    this.userManager.events.addSilentRenewError(() => {
      this.logout();
    });
  }

  signinSilentCallback() {
    this.userManager.signinSilentCallback()
      .catch((err) => {
        console.log(err);
      });
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect({
      state: location.pathname
    });
  }

  public logout(): Promise<void> {
    this.dataContextUser = null;
    return this.userManager.signoutRedirect();
  }

  async completeAuthentication() {
    this.loggedIn = true;
    this.user = await this.userManager.signinRedirectCallback();
    this.dataContextUser = this.setUserDetails(this.user);
    this._authNavStatusSource.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    return (this.user != null && !this.user.expired);
  }

  setUserDetails(user: any) {
    let currentUser = user;
    return currentUser;
  }

  async getAccessToken() {
    const user = await this.userManager.getUser();
    if (user && user.access_token) {
      return user.access_token;
    }
    return null;
  }

  async getstate(){
    return this.user?.state
  }

  getUserDetails(): User{
    return this.user;
  }
}
