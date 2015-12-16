// Quiz Result view route.
Router.route('/quiz/:_id/result', {
  name: 'quizResult',
  template: 'quizResult',
  data: function () {
    var self = this;

    // We don't want a quiz to update while the user is taking it.
    return Quizzes.findOne({ _id: self.params._id }, { reactive: false });
  }
});
