// Global route configuration.
Router.configure({
  layoutTemplate: 'main',
  notFoundTemplate: 'notFound', // Needed for server 404 page.
  onAfterAction: function () {
    // Add title tag.
    document.title = 'inquisitor!'

    // Add meta tag for mobile.
    // FIXME: This appears to add the tag twice...why?
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
  }
});

// Global route plugins (needed for client 404 page).
Router.plugin('dataNotFound', { notFoundTemplate: 'notFound' });
