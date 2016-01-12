import {Router, RouterConfiguration} from 'aurelia-router'

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Openstore';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' },
      { route: 'products', name: 'products', moduleId: 'pages/products', nav: true, title: 'Products' },
      { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' },
      { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);
    
    this.router = router;
  }
}
