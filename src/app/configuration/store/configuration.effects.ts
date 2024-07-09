import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ConfigurationService } from '../services/configuration.service';
import * as ConfigurationActions from './configuration.action';

@Injectable()
export class ConfigurationEffects {
  actions$ = inject(Actions);
  store = inject(Store);
  configurationService = inject(ConfigurationService);

  loadSites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigurationActions.loadSites), //here loadsites is merged with getall sites
      mergeMap(() =>
        this.configurationService.getAllSites().pipe(
          map(sites => ConfigurationActions.loadSitesSuccess({ sites })),
          catchError(error =>
            of(ConfigurationActions.loadSitesFailure({ error }))
          )
        )
      )
    );
  });

  loadSiteById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigurationActions.loadSiteById),
      mergeMap(action =>
        this.configurationService.getSiteById(action.siteId).pipe(
          map(site => ConfigurationActions.loadSiteByIdSuccess({ site })),
          catchError(error =>
            of(ConfigurationActions.loadSiteByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateSite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigurationActions.updateSite),
      mergeMap(action =>
        this.configurationService
          .updateSite(action.siteId, action.siteData)
          .pipe(
            map(site => ConfigurationActions.updateSiteSuccess({ site })),
            catchError(error =>
              of(ConfigurationActions.updateSiteFailure({ error }))
            )
          )
      )
    );
  });

  createSite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigurationActions.createSite),
      mergeMap(action =>
        this.configurationService.createSite(action.newSite).pipe(
          map(site => ConfigurationActions.createSiteSuccess({ site })),
          catchError(error =>
            of(ConfigurationActions.createSiteFailure({ error }))
          )
        )
      )
    );
  });

  deleteSite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigurationActions.deleteSite),
      mergeMap(action =>
        this.configurationService.deleteSite(action.siteId).pipe(
          map(() =>
            ConfigurationActions.deleteSiteSuccess({ siteId: action.siteId })
          ),
          catchError(error =>
            of(ConfigurationActions.deleteSiteFailure({ error }))
          )
        )
      )
    );
  });
}
