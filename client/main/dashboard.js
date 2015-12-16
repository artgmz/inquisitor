// Dashboard partial template events.
Template.dashboard.events({
  'click .logIn': function (event, template) {
    event.preventDefault();
    template.$('#logInModal').modal('show');
  },
  'click .logOut': function () {
    Meteor.logout();
  },
  'click .signUp': function (event, template) {
    event.preventDefault();
    template.$('#signUpModal').modal('show');
  }
});
