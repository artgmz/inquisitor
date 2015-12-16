// Global route configuration.
Router.configure({
  layoutTemplate: 'main',
  onAfterAction: function () {
    // Add title tag.
    document.title = 'inquisitor!'

    // Add meta tag for mobile.
    // FIXME: This appears to add the tag twice...why?
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
  }
});

// Global route plugins.
Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });
