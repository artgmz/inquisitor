// Methods for data access and manipulation.
Meteor.methods({
  saveQuizScore: function (quizId, correctAnswers, totalQuestions) {
    var quizScore = {};

    // User must be logged in to save a quiz score.
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    quizScore = {
      username: Meteor.user().username,
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      createdAt: new Date()
    };

    QuizScores.insert(quizScore, function (error, _id) {
      if (!error) {
        Quizzes.update(quizId, { $push: { scores: _id } });
      }
    });
  }
});
