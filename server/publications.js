// Publications.
Meteor.publish('quizzes', function () {
  return Quizzes.find();
});
