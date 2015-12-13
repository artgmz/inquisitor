// Quiz Card partial template helpers.
Template.quizCard.helpers({
  questionCount: function () {
    var self = this;
    return self.questions.length;
  }
});
