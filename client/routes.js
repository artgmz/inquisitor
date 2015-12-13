Router.configure({
  layoutTemplate: 'main',
  onAfterAction: function () {
    document.title = 'inquisitor!';
  }
});

Router.route('/', {
  name: 'home',
  template: 'home'
});