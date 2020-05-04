import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationGuard, MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AppRoutingModule } from './app-routing-module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { DataTablesModule } from 'angular-datatables';
import { AuthGuard } from './_guards';
import { AuthenticationService, UserService, ValidationService } from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomcolorModule } from 'angular-randomcolor';
import { ToastrModule } from 'ngx-toastr';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { ApplicationService } from './_services/application.service';
import { LoadingComponent } from './loading/loading.component';
import { ThemeComponent } from './theme/theme.component';
import { ExitGuard } from './_guards/exit.guard';
import { ScrollEventModule } from 'ngx-scroll-event';

@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
    ThemeComponent,
    LoadingComponent
  ],
  imports: [
    ThemeRoutingModule,
    LayoutModule,
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule,
    DataTablesModule,
    FormsModule,
    RandomcolorModule,
    ScrollEventModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MsAdalAngular6Module.forRoot({
      tenant: 'a2ed67ec-8ce2-4db9-8b9d-9eac28a1b649', //CHANGE ACCORDING TO AZURE SETTINGS
      clientId: '72ee60ab-a775-4a5f-91a0-c766e875a46a', //CHANGE ACCORDING TO AZURE SETTINGS

      redirectUri: window.location.origin,
      endpoints: {
        "https://localhost/Api/": "xxx-bae6-4760-b434-xxx"
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
    }),
    // configure the imports
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ScriptLoaderService,
    AuthenticationGuard,
    AuthGuard,
    ExitGuard,
    AuthenticationService,
    UserService,
    ApplicationService,
    ValidationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
