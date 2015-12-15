// Publications.
Meteor.publish('quizzes', function () {
  return Quizzes.find();
});

Meteor.publish('quizScores', function () {
  return QuizScores.find();
});
