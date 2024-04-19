# Cognecto Web App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Project Scaffolding
`npx @angular/cli@16 new cog-web-app --defaults --style=scss`

#### Commit Message Conventions
 [Follow these rules](https://medium.com/swlh/writing-better-commit-messages-9b0b6ff60c67)

#### Few Initial Updates
 1.  In `tsconfig.json` add `"strictPropertyInitialization": false` to ensure we can use class variables without initializing them.

  2. In `angular.json` update the `outputPath` to `dist` instead of `dist/cog-web-app` to avoid the folder name being appended to the dist folder.

  3. In `package.json` update the `start` script to `ng serve --open` to open the browser automatically.

  4. Update `angular.json` styles to  `src/styles.scss` as the global style file, and delete `styles.scss` as default global file.

  5. Install Angular Material with `indigo/pink` theme, with global `typography` styles and enable `angular animations`.

  6. Configure `Prettier` and `ESLint` with `Angular`, [more here](https://itnext.io/configure-prettier-and-eslint-with-angular-e7b4ce979cd8).

  7. Generate environment files for `development` and `production` environments `ng g environments`.

  8. Configure `husky` to run lint and test before every commit. Enable these [settings](https://www.mariokandut.com/how-to-add-husky-to-angular/),  in your local environment.

  9. Update `tsconfig.app.json` to support NodeJs Timer by adding `compilerOptions.types` as `["node"]`.

 10. Update `.eslintrc.json` and add `"@ngrx/no-store-subscription": "off"`  and `"@ngrx/prefer-inline-action-props": "off"` to avoid explicit any error.

 11. `xng-breadcrumb` is added with version 10.0.2 as versions greater than 10.0.2 are not compatible with Angular 16.2.12 [more here](https://betterprogramming.pub/add-breadcrumbs-to-your-angular-app-in-just-5-minutes-3119e376e901).
