// Publications.
Meteor.publish('quizzes', function () {
  return Quizzes.find();
});

// Run on server start-up.
Meteor.startup(function () {
  var basicArithmeticQuiz = {};
  var nflTriviaQuiz = {};
  var quizzes = [];

  // If there are no quizzes in the database, insert the sample quizzes.
  if (Quizzes.find().count() === 0) {
    basicArithmeticQuiz = JSON.parse(Assets.getText('quizzes/basic-arithmetic.json'));
    nflTriviaQuiz = JSON.parse(Assets.getText('quizzes/nfl-trivia.json'));

    quizzes = [basicArithmeticQuiz, nflTriviaQuiz];

    _.each(quizzes, function (quiz) {
      Quizzes.insert(quiz);
    });
  }
});
