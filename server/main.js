// Run on server start-up.
Meteor.startup(function () {
  var basicArithmeticQuizId = null;
  var quizScoreIds = [];
  var quizScores = [];
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
      JSON.parse(Assets.getText('quizzes/nfl-trivia.json')),
      JSON.parse(Assets.getText('quizzes/us-state-capitals.json'))
    ];

    _.each(quizzes, function (quiz) {
      Quizzes.insert(quiz);
    });
  }

  // Seed the database with sample quiz scores for 'Basic Arithmetic' if none are found.
  if (QuizScores.find().count() === 0) {
    quizScores = JSON.parse(Assets.getText('quizScores/basic-arithmetic.json'));

    _.each(quizScores, function (quizScore) {
      quizScoreIds.push(QuizScores.insert({
        username: quizScore.username,
        correctAnswers: quizScore.correctAnswers,
        totalQuestions: quizScore.totalQuestions,
        createdAt: new Date()
      }));
    });

    basicArithmeticQuizId = Quizzes.findOne({ name: 'Basic Arithmetic' })._id;

    Quizzes.update(basicArithmeticQuizId,  { $set: { scores: quizScoreIds } });
  }
});
