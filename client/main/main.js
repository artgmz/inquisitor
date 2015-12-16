// Main view template events.
Template.main.events({
  'click .logOut': function () {
    Meteor.logout();
  },
  'click .signUp': function (event, template) {
    event.preventDefault();
    template.$('#signUpModal').modal('show');
  },
  'click .logIn': function (event, template) {
    event.preventDefault();
    template.$('#logInModal').modal('show');
  }
});
