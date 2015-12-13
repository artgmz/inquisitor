// Quiz Card partial template helpers.
Template.quizCard.helpers({
  totalQuestions: function () {
    var self = this;
    return self.questions && self.questions.length;
  }
});

// Quiz Card partial template events.
Template.quizCard.events({
  'click .quiz': function () {
    var self = this;
    Router.go('quiz', { _id: self._id });
  }
});

// Take Quiz view template data setup.
Template.quiz.onCreated(function () {
  var self = this;

  self.currentQuestionIdx = new ReactiveVar(0);

  Session.set('disableNextStepButton', true);
  Session.set('numCorrectAnswers', 0);
});

// Take Quiz view template helpers.
Template.quiz.helpers({
  disableNextStepButton: function () {
    return Session.get('disableNextStepButton');
  },
  currentQuestion: function () {
    var self = this;
    return self.questions && self.questions[Template.instance().currentQuestionIdx.get()];
  },
  currentQuestionNum: function () {
    return Template.instance().currentQuestionIdx.get() + 1;
  },
  nextStepButtonLabel: function () {
    var currentQuestionNum = Template.instance().currentQuestionIdx.get() + 1;
    var totalQuestions = self.questions && self.questions.length;

    return (currentQuestionNum === totalQuestions) ? 'Finish' : 'Continue';
  },
  totalQuestions: function () {
    var self = this;
    return self.questions && self.questions.length;
  }
});

// Take Quiz view template events.
Template.quiz.events({
  'click #nextStep': function (event, template) {
    var self = this;
    var chosenAnswer = template.find('input:radio:checked').value;
    var currentQuestionIdx = Template.instance().currentQuestionIdx.get();
    var correctAnswer = self.questions[currentQuestionIdx].answer;
    var totalQuestions = self.questions && self.questions.length;

    if (chosenAnswer === correctAnswer) {
      Session.set('numCorrectAnswers', Session.get('numCorrectAnswers') + 1);
    }

    if ((currentQuestionIdx + 1) === totalQuestions) {
      Router.go('quiz-results', { _id: self._id });
    }
    else {
      // Disable button for next question.
      Session.set('disableNextStepButton', true);

      // Radio buttons for next question.
      _.each(document.getElementsByName('answerOption'), function (radioButton) {
        radioButton.checked = false;
      });

      // Trigger loading of next question.
      Template.instance().currentQuestionIdx.set(currentQuestionIdx + 1);
    }
  }
});

// Take Quiz Question partial template events.
Template.quizQuestion.events({
  'change input:radio': function (event, template) {
    if (Session.get('disableNextStepButton')) {
      Session.set('disableNextStepButton', false);
    }
  }
});

// Take Quiz Results view template helpers.
Template.results.helpers({
  totalCorrectAnswers: function () {
    return Session.get('numCorrectAnswers');
  },
  totalQuestions: function () {
    var self = this;
    return self.questions && self.questions.length;
  }
});

// Take Quiz Results view template events.
Template.results.events({
  'click button': function () {
    var self = this;
    Router.go('quiz', { _id: self._id });
  }
});
