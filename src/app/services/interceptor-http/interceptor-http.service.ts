import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner-service/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorHttpService implements HttpInterceptor {
  activeRequests: number = 0;

  constructor(private spinnerScreenService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = request;

    // Adiciona o Authorization automaticamente
    const token = localStorage.getItem('token');
    if (token) {
      modifiedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          ...request.headers.keys().reduce((acc, key) => {
            acc[key] = request.headers.get(key) ?? '';
            return acc;
          }, {} as Record<string, string>),
        },
      });
    }

    if (request.headers.get('skipSpinner')) {
      return next.handle(modifiedReq);
    }

    if (this.activeRequests === 0) {
      this.spinnerScreenService.startLoading();
    }

    this.activeRequests++;

    return next.handle(modifiedReq).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.spinnerScreenService.stopLoading();
        }
      })
    );
  }
}
