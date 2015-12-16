// Global route configuration.
Router.configure({
  layoutTemplate: 'main',
  onAfterAction: function () {
    // We set the title for all pages here because Iron Router prepends the <head>
    // tag internally, so we can't set the title as we normally would.
    document.title = 'inquisitor!';
  }
});

// Global route plugins.
Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });
