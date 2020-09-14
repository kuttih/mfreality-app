import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (this.authService.isUserLoggedIn())
        return true;
  
      this.router.navigate(['/']);
  
      return false;
    }
}
