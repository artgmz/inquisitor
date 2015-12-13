// Quiz view route.
Router.route('/quiz/:_id', {
  name: 'quiz',
  template: 'quiz',
  data: function () {
    var self = this;
    return Quizzes.findOne({ _id: self.params._id });
  }
});
