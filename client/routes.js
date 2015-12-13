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

// Take Quiz view route.
Router.route('/quiz/:_id', {
  name: 'quiz',
  template: 'quiz',
  data: function () {
    var self = this;
    return Quizzes.findOne({ _id: self.params._id });
  }
});

// Take Quiz Results view route.
Router.route('/quiz/:_id/results', {
  name: 'quiz-results',
  template: 'results',
  data: function () {
    var self = this;
    return Quizzes.findOne({ _id: self.params._id });
  }
});
