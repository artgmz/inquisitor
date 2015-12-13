// Quiz Result view route.
Router.route('/quiz/:_id/result', {
  name: 'quizResult',
  template: 'quizResult',
  data: function () {
    var self = this;
    return Quizzes.findOne({ _id: self.params._id });
  }
});
