// Quiz Score partial template helpers.
Template.quizScore.helpers({
  correctAnswerPercentage: function () {
    let PERCENTAGE_CONVERSION = 100;

    var self = this;

    return (self.correctAnswers / self.totalQuestions) * PERCENTAGE_CONVERSION;
  },
  formattedScoreCreationDate: function () {
    var self = this;
    var createdDate = new Date(self.createdAt);

    return (createdDate.getMonth() + 1) + '/' + createdDate.getFullYear();
  }
});
