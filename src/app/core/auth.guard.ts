import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin) {
        return true;
    }

    alert('No access here!');
    return router.createUrlTree(['/']);
}
