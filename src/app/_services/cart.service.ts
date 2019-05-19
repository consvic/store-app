import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
}
