import {NgModule} from '@angular/core';
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: AuthPageComponent, title: 'Auth' },
];

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [AuthPageComponent]
})
export class AuthModule { }
