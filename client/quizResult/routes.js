// Quiz Result view route.
Router.route('/quiz/:_id/result', {
  name: 'quizResult',
  template: 'quizResult',
  waitOn: function () {
    var self = this;
    return  Meteor.subscribe('quizzes', self.params._id);
  },
  data: function () {
    var self = this;

    if (self.ready()) {
      // We don't want a quiz to update while the user is taking it.
      return Quizzes.findOne({ _id: self.params._id }, { reactive: false });
    }
  }
});
