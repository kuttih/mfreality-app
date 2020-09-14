import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {AuthService} from '../auth/auth.service'
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicService implements HttpInterceptor {

  constructor(private authService: AuthService, private tokenizer:TokenStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let authReq = request;
    const token = this.tokenizer.getToken();
    // console.log(token);

    if (token != null) {
      // for Spring Boot back-end
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}
