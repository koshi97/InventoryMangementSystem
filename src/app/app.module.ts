import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MaterialModule } from './shared/material.module';
import { LandingComponent } from './landing/landing.component';
import { SupplierComponent } from './supplier/supplier.component';
import { environment } from 'environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SupplierInvoicesComponent } from './supplier-invoices/supplier-invoices.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './auth/auth.service';
import { EmployeeService } from './shared/services/employee.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
@NgModule({
  imports: [
    
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireDatabaseModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    AdminLayoutComponent,
    LandingComponent,
  ],
  providers: [AuthService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
