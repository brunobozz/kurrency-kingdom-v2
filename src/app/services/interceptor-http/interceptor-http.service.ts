import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner-service/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorHttpService {
  activeRequests: number = 0;

  constructor(private spinnerScreenService: SpinnerService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.get('skipSpinner')) return next.handle(request);

    if (this.activeRequests === 0) {
      this.spinnerScreenService.startLoading();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.spinnerScreenService.stopLoading();
        }
      })
    );
  }
}
