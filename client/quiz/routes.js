// Quiz view route.
Router.route('/quiz/:_id', {
  name: 'quiz',
  template: 'quiz',
  data: function () {
    var self = this;

    // We don't a quiz to update while the user is taking it.
    return Quizzes.findOne({ _id: self.params._id }, { reactive: false });
  }
});
