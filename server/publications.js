// Publications.
Meteor.publish('quizzes', function () {
  var quizzes = Quizzes.find();

  if (quizzes) {
    return quizzes;
  }

  this.ready();
});

Meteor.publish('quizScores', function () {
  var quizScores = QuizScores.find();

  if (quizScores) {
    return quizScores;
  }

  this.ready();
});
