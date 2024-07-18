import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationDataService {
  _isAsideVisible: boolean;
  _asideComponent: Type<any> | null;
  updateAsideData = new Subject<number>();

  get isAsideVisible() {
    return this._isAsideVisible;
  }

  set isAsideVisible(_isAsideVisible: boolean) {
    this._isAsideVisible = _isAsideVisible;
  }

  get asideComponent(): Type<any> | null {
    return this._asideComponent;
  }

  set asideComponent(_asideComponent: Type<any> | null) {
    this._asideComponent = _asideComponent;
  }
}
