// Dashboard partial template events.
Template.dashboard.events({
  'click #logIn': function (event, template) {
    event.preventDefault();

    // Show invalidity errors. Session variables necessary for use in callbacks.
    Session.set('invalidUsername', false);
    Session.set('invalidPassword', false);

    template.$('#logInModal').modal('show');
  },
  'click #logOut': function () {
    Meteor.logout();
  },
  'click #signUp': function (event, template) {
    event.preventDefault();

    // Show invalidity errors. Session variables necessary for use in callbacks.
    Session.set('invalidUsername', false);
    Session.set('invalidPassword', false);

    template.$('#signUpModal').modal('show');
  }
});
