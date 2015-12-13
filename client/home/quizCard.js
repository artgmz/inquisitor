// Quiz Card partial template helpers.
Template.quizCard.helpers({
  totalQuestions: function () {
    var self = this;
    return self.questions && self.questions.length;
  }
});

// Quiz Card partial template events.
Template.quizCard.events({
  'click li': function () {
    var self = this;
    Router.go('quiz', { _id: self._id });
  }
});
