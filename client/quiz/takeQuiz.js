// Take Quiz view template initialization.
Template.takeQuiz.onCreated(function () {
  var self = this;

  // Index of first question in quiz is always 0.
  self.currentQuestionIdx = new ReactiveVar(0);

  // User must select an answer before being able to continue. Using a session 
  // variable because we need this data across templates.
  Session.set('disableNextStepButton', true);

  // Track how many of the user's answers are correct. Using a session variable 
  // because we need this data across templates.
  Session.set('numCorrectAnswers', 0);
});

// Take Quiz view template helpers.
Template.takeQuiz.helpers({
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
    var self = this;
    var currentQuestionNum = Template.instance().currentQuestionIdx.get() + 1;
    var totalQuestions = self.questions && self.questions.length;

    // Next step is 'Continue' unless user is on the quiz's last question.
    return (currentQuestionNum === totalQuestions) ? 'Finish' : 'Continue';
  },
  totalQuestions: function () {
    var self = this;
    return self.questions && self.questions.length;
  }
});

// Take Quiz view template events.
Template.takeQuiz.events({
  'click #nextStep': function (event, template) {
    var self = this;
    var chosenAnswer = template.find('input:radio:checked').value;
    var currentQuestionIdx = Template.instance().currentQuestionIdx.get();
    var correctAnswer = self.questions[currentQuestionIdx].answer;
    var totalQuestions = self.questions && self.questions.length;

    if (chosenAnswer === correctAnswer) {
      Session.set('numCorrectAnswers', Session.get('numCorrectAnswers') + 1);
    }

    // If user is on the quiz's last question, go to quiz result route.
    if ((currentQuestionIdx + 1) === totalQuestions) {
      Router.go('quizResult', { _id: self._id });
    }
    // Else, go on to the next question in the quiz.
    else {
      // Disable the next step button for the next question.
      Session.set('disableNextStepButton', true);

      // Ensure we don't have a pre-selected answer in the next question.
      _.each(document.getElementsByName('answerOption'), function (radioButton) {
        radioButton.checked = false;
      });

      // Set the current question's index to the next question to trigger loading.
      Template.instance().currentQuestionIdx.set(currentQuestionIdx + 1);
    }
  }
});
