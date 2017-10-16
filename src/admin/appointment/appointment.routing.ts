import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './appointment.list.component';
import { AuthGuard } from '../../auth/auth-guard.service';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: AppointmentListComponent,
        path: 'list'
    }
];

export const routing = RouterModule.forChild(routes);
