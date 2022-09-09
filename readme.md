# Conductify

## Project Structure

### Components

Components should be stored in packages and need to be exported, but not as a default so that many components can be created in a single source file. All components should extend React.Component. Components are located at:
/components/{package}/{name}.js

#### Pages

A page (or screen) is a component that can be navigated to and rendered on its own. Pages are located at:
/components/pages/{name}.js

### Services

Services should be static singletons that include an async ready() function that will start initialisation and only return true once the service is ready. All functions in a Service should be static. Services are located at:

/services/{package}/{name}Service.js

## Project Navigation

The navigation component and service work together to provide navigation between pages within the app. The navigation component is only used in the MainLayout component, and it inserts an instance of the relevant page component that should be rendered.

The navigation service is used to navigate between screens using:
NavigationService.navigate(name);

All screens must first be registered, this is done in the App() method using:
NavigationService.register(name, element);

The first screen registered will be the default screen when the app is first started.