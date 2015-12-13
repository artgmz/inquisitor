// Run on server start-up.
Meteor.startup(function () {
  var basicArithmeticQuiz = {};
  var nflTriviaQuiz = {};
  var quizzes = [];

  // Seed the database with sample quizzes if none are found.
  if (Quizzes.find().count() === 0) {
    basicArithmeticQuiz = JSON.parse(Assets.getText('quizzes/basic-arithmetic.json'));
    nflTriviaQuiz = JSON.parse(Assets.getText('quizzes/nfl-trivia.json'));

    quizzes = [basicArithmeticQuiz, nflTriviaQuiz];

    _.each(quizzes, function (quiz) {
      Quizzes.insert(quiz);
    });
  }
});
