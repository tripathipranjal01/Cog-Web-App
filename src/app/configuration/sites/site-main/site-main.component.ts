import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ConfigurationActions from '../../store/configuration.action';

@Component({
  selector: 'app-site-main',
  templateUrl: './site-main.component.html',
  styleUrls: ['./site-main.component.scss'],
})
export class SiteMainComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ConfigurationActions.loadSites());
  }
}
