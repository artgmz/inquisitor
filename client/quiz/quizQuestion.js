// Quiz Question partial template events.
Template.quizQuestion.events({
  'change input:radio': function (event) {
    // Enable the next step button after the user selects an answer.
    if (Session.get('disableNextStepButton')) {
      Session.set('disableNextStepButton', false);
    }
  }
});
