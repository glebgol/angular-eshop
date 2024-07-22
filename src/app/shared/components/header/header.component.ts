import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {faCartShopping, faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faCartShopping = faCartShopping;
  faLogout = faArrowRightToBracket

  constructor(private userService: UserService) {
  }

  get user() {
    return this.userService.getCurrentUser()?.email;
  }

  logOut() {
    this.userService.logOut();
  }
}
