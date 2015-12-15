// Run on server start-up.
Meteor.startup(function () {
  var basicArithmeticQuiz = {};
  var nflTriviaQuiz = {};
  var quizzes = [];
  var users = [];

  // Seed the database with sample users if none are found.
  if (Meteor.users.find().count() === 0) {
    users = [
      JSON.parse(Assets.getText('users/bendingunit154.json')),
      JSON.parse(Assets.getText('users/capt_leela.json')),
      JSON.parse(Assets.getText('users/philip-j-fry.json')),
      JSON.parse(Assets.getText('users/prof.json'))
    ];
  }

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
