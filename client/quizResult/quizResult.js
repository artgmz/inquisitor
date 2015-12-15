// Quiz Result view template helpers.
Template.quizResult.helpers({
  totalCorrectAnswers: function () {
    return Session.get('numCorrectAnswers');
  },
  totalQuestions: function () {
    var self = this;
    return self.questions && self.questions.length;
  }
});

// Quiz Result view template events.
Template.quizResult.events({
  'click button': function () {
    var self = this;
    Router.go('takeQuiz', { _id: self._id });
  }
});
