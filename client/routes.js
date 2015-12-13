// Global configurations.
Router.configure({
  layoutTemplate: 'main',
  onAfterAction: function () {
    document.title = 'inquisitor!';
  }
});

// Home view route.
Router.route('/', {
  name: 'home',
  template: 'home',
  data: function () {
    return { quizzes: Quizzes.find() };
  }
});

  }
});
