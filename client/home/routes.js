// Home view route.
Router.route('/', {
  name: 'home',
  template: 'home',
  waitOn: function () {
    return Meteor.subscribe('quizzes');
  },
  data: function () {
    var self = this;

    if (self.ready()) {
      return { quizzes: Quizzes.find() };
    }
  }
});
