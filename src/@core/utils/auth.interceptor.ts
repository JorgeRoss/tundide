import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');

        const authReq = req.clone({
            headers: req.headers.set('Authorization', token)
        });

        return next.handle(authReq);
        // TODO: Si hay error disparar esto
        // this.errorOccurred.emit(res);
    }
}