// Quiz view route.
Router.route('/quiz/:_id', {
  name: 'quiz',
  template: 'quiz',
  waitOn: function () {
    var self = this;

    // Wait until we get our quiz back.
    return Meteor.subscribe('quizzes', self.params._id);
  },
  data: function () {
    var self = this;
    var quizScores = [];
    var quiz = {};

    // Get quiz score data once quiz is ready to go.
    if (self.ready()) {
      quiz = Quizzes.findOne({ _id: self.params._id });

      if (quiz) {
        quizScores = QuizScores.find({ _id: { $in: quiz.scores } }).fetch();

        return {
          quizScores: quizScores,
          quiz: quiz
        };
      }
      else {
        return null;
      }
      
    }
  }
});

// Take Quiz view route.
Router.route('/quiz/:_id/take', {
  name: 'takeQuiz',
  template: 'takeQuiz',
  data: function () {
    var self = this;

    // We don't want a quiz to update while the user is taking it.
    return Quizzes.findOne({ _id: self.params._id }, { reactive: false });
  }
});
