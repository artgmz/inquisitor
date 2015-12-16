// Quiz view template helpers.
Template.quiz.helpers({
  hasLeaderboardScores: function () {
    var self = this;
    return self.quizScores.length > 0;
  },
  hasUserScores: function () {
    var self = this;
    var userQuizScores = [];

    if (Meteor.user()) {
      userQuizScores = _.filter(self.quizScores, function (quizScore) {
        return quizScore.username === Meteor.user().username;
      });
    }

    return userQuizScores.length > 0;
  },
  leaderboardScores: function () {
    var self = this;
    var sortedQuizScores = _.sortBy(self.quizScores, 'correctAnswers').reverse();
    return _.first(sortedQuizScores, 5);
  },
  totalQuestions: function () {
    var self = this;
    return self.quiz.questions && self.quiz.questions.length;
  },
  userScores: function () {
    var self = this;
    var sortedUserQuizScores = [];
    var userQuizScores = [];

    if (Meteor.user()) {
      userQuizScores = _.filter(self.quizScores, function (quizScore) {
        return quizScore.username === Meteor.user().username;
      });

      sortedUserQuizScores = _.sortBy(userQuizScores, 'createdAt').reverse();
    }

    return _.first(sortedUserQuizScores, 5);
  }
});

// Quiz view template events.
Template.quiz.events({
  'click button': function () {
    var self = this;
    Router.go('takeQuiz', { _id: self.quiz._id });
  }
});
