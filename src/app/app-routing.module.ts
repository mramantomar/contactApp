import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  {path: '', redirectTo:'/contact/admin', pathMatch: 'full'},
  {path:'contact/admin',component:ContactManagerComponent},
  {path:'contact/add',component:AddContactComponent},
  {path:'contact/view/:contactId',component:ViewContactComponent},
  {path:'contact/edit/:contactId',component:EditContactComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
