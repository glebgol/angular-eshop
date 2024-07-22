import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class BackService {
  private paramSource = new BehaviorSubject(false);

  constructor() {}

  sharedData = this.paramSource.asObservable();

  setParam(param:boolean) {
    this.paramSource.next(param)
  }
}
