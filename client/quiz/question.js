// Question partial template events.
Template.question.events({
  'change input:radio': function (event, template) {
    // Enable the next step button after the user selects an answer.
    if (Session.get('disableNextStepButton')) {
      Session.set('disableNextStepButton', false);
    }
  }
});
