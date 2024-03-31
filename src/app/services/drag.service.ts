import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DragServiceService {
  private _draggblePlayerSubj$ = new BehaviorSubject<Player | null>(null);

  get draggblePlayer$(): Observable<Player | null> {
    return this._draggblePlayerSubj$
      .asObservable()
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  get draggblePlayer(): Player | null {
    return this._draggblePlayerSubj$.value;
  }

  set draggblePlayerSubj(value: Player | null) {
    this._draggblePlayerSubj$.next(value);
  }

  clearDraggblePlayer(): void {
    this._draggblePlayerSubj$.next(null);
  }
}
