import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppInterceptorInterceptor } from './core/interceptor/app-interceptor.interceptor';
import { AuthService } from './core/services/auth-service/auth.service';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptorInterceptor,
    multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
