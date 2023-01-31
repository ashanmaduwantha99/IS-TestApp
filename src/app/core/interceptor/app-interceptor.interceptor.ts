
import { throwError as observableThrowError, Observable, of, from } from 'rxjs';
import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter, catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth-service/auth.service';
declare var $: any;
declare var onErrorMessageBox: Function;

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.loaderService.show();
    return from(this.handle(req, next))
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isAuthenticated()) {
      var token = await this.authService.getAccessToken()

      req = req.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } });
    }
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e) => {
      //   this.dataContext.navigatedFrom = e['url'];
      //   this.dataContext.navigatedTo = e['url'];
    });

    return next.handle(req).pipe(catchError(response => {
      if (response instanceof HttpErrorResponse) {
        //if error has thrown
        if (response.status == 403 || response.status == 401) {// Forbidden,Unauthorized
          this.authService.logout();
        }
      }
      return observableThrowError(response);
    })).toPromise();
  }
}
