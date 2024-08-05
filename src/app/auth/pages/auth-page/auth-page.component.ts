import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserDto} from "../../../shared/models/user-dto.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  user: UserDto = {email: '', password: ''};
  isSignUp: boolean = false;
  isUserNotExists = false;
  isUserWithEmailExists = false;

  constructor(private userService: UserService, private router: Router) {}

  async submitForm() {
    if (this.isSignUp) {
      await this.handleRegister();
    } else {
      await this.handleLogin();
    }
  }

  private async handleRegister() {
    this.userService.isUserWithEmailExists(this.user.email).then(isUserExists => {
      this.isUserWithEmailExists = isUserExists;

      if (!this.isUserWithEmailExists) {
        this.userService.createUser(this.user);
        this.router.navigate(['/']);
      }
    });
  }

  private async handleLogin() {
    this.userService.isUserExists(this.user).then(isUserExists => {
      if (isUserExists) {
        this.isUserNotExists = false;
        this.userService.signIn(this.user);
        this.router.navigate(['/']);
      } else {
        this.isUserNotExists = true;
      }
    });
  }

  switchForm() {
    this.isSignUp = !this.isSignUp;
  }
}
