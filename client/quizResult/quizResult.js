// Quiz Result view template initialization.
Template.quizResult.onCreated(function () {
  var self = this;

  // If the user is logged in, save the quiz result ("score"). Otherwise wait
  // until the user logs in to save the quiz result.
  self.autorun(function (computation) {
    if (Meteor.user()) {
      Meteor.call(
        'saveQuizScore',
        self.data && self.data._id,
        Session.get('numCorrectAnswers'),
        self.data && self.data.questions && self.data.questions.length
      );

      // Only run this once.
      computation.stop();
    }
  });
});

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
