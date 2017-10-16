import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './appointment.routing';
import { AuthGuard } from '../../auth/auth-guard.service';
import { AppointmentNewComponent } from './appointment.new.component';
import { AppointmentListComponent } from './appointment.list.component';
import { AppointmentService } from './appointment.service';
import { SharedModule } from '../../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AppointmentNewComponent, AppointmentListComponent],
    exports: [AppointmentNewComponent, AppointmentListComponent],
    imports: [routing,
        FormsModule,
        RouterModule,
        CommonModule,
        NgbModule,
        SharedModule.forRoot(),
        ToastyModule.forRoot()],
    providers: [
        AuthGuard,
        AppointmentService]
})

export class AppointmentModule { }