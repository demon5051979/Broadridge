import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return <Observable<HttpEvent<any>>>next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                if (event.body.isOk != null) {
                  if (event.body.isOk) {
                    if (event.body.exceptionMessage) {
                      console.warn(event.body.exceptionMessage);
                    }
      
                    event = event.clone({
                      body: event.body.value
                    });
      
                    return event;
                  } else {
                    let errMessage: string = '';
                    if (event.body.exceptionMessage) {
                      errMessage = event.body.exceptionMessage;
                    }
                    errMessage = event.body.message + ': ' + errMessage;
                    if (event.body.errorList) {
                      errMessage = event.body.errorList;
                    }
                    if (event.body.resultLevel === 2) {
                      throw new HttpErrorResponse({
                        status: 2,
                        statusText: event.body
                      });
                    }
                    throw new HttpErrorResponse({
                      status: 0,
                      statusText: errMessage
                    });
                  }
                }
                
                return event;
              }
              return next.handle(req);
            }),
            catchError((err: any) => {
              let statusText: string = err.statusText;
      
              if (err.status === 500) {
                statusText = 'An error occurred on the server';
              } else if (err.status === 404) {
                statusText = err.status + ' ' + err.statusText;
              } else if (err.status === 2) {
                // todo BL error
                return throwError(statusText);
              } else if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
                statusText = 'An error has occurred.';
              } else if (err.status === 0) {
                statusText = 'An error has occurred.';
              } else {
                statusText = 'An error has occurred.';
              }
              console.warn(statusText, err);
      
              return throwError(statusText);
            })
          );
    }
}
