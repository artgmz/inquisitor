// Quiz view template helpers.
Template.quiz.helpers({
  hasLeaderboardScores: function () {
    var self = this;
    var sortedQuizScores = [];

    sortedQuizScores = _.sortBy(self.quizScores, function (quizScore) {
      return quizScore.correctAnswers;
    }).reverse();

    return sortedQuizScores.length > 0;
  },
  hasUserScores: function () {
    var self = this;
    var sortedQuizScores = [];
    var userQuizScores = [];

    if (Meteor.user()) {
      userQuizScores = _.filter(self.quizScores, function (quizScore) {
        return quizScore.username === Meteor.user().username;
      });

      sortedQuizScores = _.sortBy(userQuizScores, function (quizScore) {
        return quizScore.createdAt;
      }).reverse();
    }

    return sortedQuizScores.length > 0;
  },
  leaderboardScores: function () {
    var self = this;
    var sortedQuizScores = [];

    sortedQuizScores = _.sortBy(self.quizScores, function (quizScore) {
      return quizScore.correctAnswers;
    }).reverse();

    return _.first(sortedQuizScores, 5);
  },
  totalQuestions: function () {
    var self = this;
    return self.quiz.questions && self.quiz.questions.length;
  },
  userScores: function () {
    var self = this;
    var sortedQuizScores = [];
    var userQuizScores = [];

    if (Meteor.user()) {
      userQuizScores = _.filter(self.quizScores, function (quizScore) {
        return quizScore.username === Meteor.user().username;
      });

      sortedQuizScores = _.sortBy(userQuizScores, function (quizScore) {
        return quizScore.createdAt;
      }).reverse();
    }

    return _.first(sortedQuizScores, 5);
  }
});

// Quiz view template events.
Template.quiz.events({
  'click button': function () {
    var self = this;
    Router.go('takeQuiz', { _id: self.quiz._id });
  }
});
