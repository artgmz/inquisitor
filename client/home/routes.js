// Home view route.
Router.route('/', {
  name: 'home',
  template: 'home',
  data: function () {
    return { quizzes: Quizzes.find() };
  }
});
