import {NgModule} from '@angular/core';
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UserService} from "./services/user.service";
import {AuthGuard} from "./guards/auth.guard";
import {HeaderComponent} from "./components/header/header.component";

const routes: Routes = [
  { path: '', component: AuthPageComponent, title: 'Auth' },
];

@NgModule({
  declarations: [
    AuthPageComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AuthPageComponent,
    HeaderComponent
  ],
  providers: [
    UserService,
    AuthGuard
  ]
})
export class AuthModule { }
