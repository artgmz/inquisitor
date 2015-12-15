// Run on server start-up.
Meteor.startup(function () {
  var quizzes = [];
  var userAccounts = [];

  // Seed the database with sample user accounts if none are found.
  if (Meteor.users.find().count() === 0) {
    userAccounts = [
      JSON.parse(Assets.getText('users/bendingunit154.json')),
      JSON.parse(Assets.getText('users/capt_leela.json')),
      JSON.parse(Assets.getText('users/philip-j-fry.json')),
      JSON.parse(Assets.getText('users/prof.json'))
    ];

    _.each(userAccounts, function (userAccount) {
      Accounts.createUser(userAccount);
    });
  }

  // Seed the database with sample quizzes if none are found.
  if (Quizzes.find().count() === 0) {
    quizzes = [
      JSON.parse(Assets.getText('quizzes/basic-arithmetic.json')),
      JSON.parse(Assets.getText('quizzes/nfl-trivia.json'))
    ];

    _.each(quizzes, function (quiz) {
      Quizzes.insert(quiz);
    });
  }
});
