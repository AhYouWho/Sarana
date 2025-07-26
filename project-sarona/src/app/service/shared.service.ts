import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private valueSource = new BehaviorSubject<string>('initial value');
  currentValue$ = this.valueSource.asObservable();

  updateValue(value: any) {
    this.valueSource.next(value);
  }
}
