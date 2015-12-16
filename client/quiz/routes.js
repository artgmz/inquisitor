// Quiz view route.
Router.route('/quiz/:_id', {
  name: 'quiz',
  template: 'quiz',
  waitOn: function () {
    var self = this;

    return [
      Meteor.subscribe('quizzes', self.params._id),
      Meteor.subscribe('quizScores')
    ];
  },
  data: function () {
    var self = this;
    var quizScores = [];
    var quiz = {};

    if (self.ready()) {
      quiz = Quizzes.findOne({ _id: self.params._id });

      // If we have a quiz, get its scores.
      if (quiz) {
        quizScores = QuizScores.find({ _id: { $in: quiz.scores } }).fetch();

        return {
          quiz: quiz,
          quizScores: quizScores
        };
      }
    }
  }
});

// Take Quiz view route.
Router.route('/quiz/:_id/take', {
  name: 'takeQuiz',
  template: 'takeQuiz',
  waitOn: function () {
    var self = this;
    return Meteor.subscribe('quizzes', self.params._id);
  },
  data: function () {
    var self = this;

    if (self.ready()) {
      // We don't want a quiz to update while the user is taking it.
      return Quizzes.findOne({ _id: self.params._id }, { reactive: false });
    }
  }
});
