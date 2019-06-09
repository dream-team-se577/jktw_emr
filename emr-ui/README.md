# EmrUi

## How to build and run this project

First, make sure you have the emr_server running, for more instructions see the README.md in the "emr_server" directory on the top level of this repo.

Download Node.js (https://nodejs.org/en/)

Download Yarn (https://yarnpkg.com/en/)

In this project directory, run:
1. "npm install -g @angular/cli"
2. "ng set --global packageManager=yarn"
3. You may also need to run: "npm install --save @angular-devkit/build-angular"

### Debug Build

Use "ng build" in the project directory

Use "npm start" in project directory

Using your browser, type "http://localhost:4200/dashboard" in the address bar.

### Production Build

Use "ng build --prod" in the project directory

Then use "node server.js" to start the server.

Using your browser, type "http://localhost:4200/dashboard" in the address bar.

## A Note about Project Structure

This has a typical Angular project structure with the "app" folder separated into "component", "model" and "service" directories.  There are four different types of entities used by the service:
1. Patient
2. Staff
3. Lab Record
4. Appointment

Each of these have their own service and their own group of components.  Each component group for entities are further broken down into:
1. List ["\<entity\>-list.component"] - These components will take a list of the entity type and create a table for a quick-look at the entity’s attributes and a link to view more details (via a route to the Form component).
2. Search ["\<entity\>-search.component"] - These components are used for selecting relationships between the entities.  Each entity has its own criteria you can search on and it’ll query the service to find entries that match the criteria and put them in a table with a button that enables a “Select” which will output the selected entity so the parent component can decide what to do with it.
3. Create ["\<entity\>-create.component"] - These components are used for creating a fresh record.  Utilizes the Search component for resolving references and the List component for listing existing picks.
4. Form ["\<entity\>-form.component"] - These components provide detailed information on an entity.  They can also be used to edit existing entities.
5. Route ["\<entity\>.component"] - These components are the start pages for the entities that list all existing ones (using List) while embedding a Create entity at the top.

The components are separated in such a way that if one entity needs a reference to another entity (whether it's to complete registration or to list its dependencies), it has options to display them.  For example, the "appointment-create.component" needs to allow the user to determine what Patient the appointment should concern.  To do this, the create component for Appointment references the "patient-search.component" so the user can search for the applicable patient and the "patient-list.component" to show what the user has chosen.

## More Information

### Generating Code:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
