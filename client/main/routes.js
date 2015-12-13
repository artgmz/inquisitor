// Global route configuration.
Router.configure({
  layoutTemplate: 'main',
  onAfterAction: function () {
    // All pages share the same title. This is set here because Iron Router 
    // prepends the <head> tag internally, so we can't set the title as normal.
    document.title = 'inquisitor!';
  }
});
