import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackService {
  constructor() { }
  private paramSource = new BehaviorSubject(false);// inside bracket you can send any type
  sharedData = this.paramSource.asObservable();
  setParam(param:boolean) { this.paramSource.next(param)}
}
