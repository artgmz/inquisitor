// Quiz Card partial template helpers.
Template.quizCard.helpers({
  totalQuestions: function () {
    var self = this;
    return self.questions && self.questions.length;
  }
});

  }
});
