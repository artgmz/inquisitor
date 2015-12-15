// Main view template events.
Template.main.events({
  'click .logOut': function () {
    Meteor.logout();
  },
  'click .signUp': function (event, template) {
    var signUpModal = template.find('#signUpModal');

    event.preventDefault();

    // Use jQuery to access Bootstrap's modal functionality.
    $(signUpModal).modal('show');
  },
  'click .logIn': function (event, template) {
    var logInModal = template.find('#logInModal');

    event.preventDefault();

    // Use jQuery to access Bootstrap's modal functionality.
    $(logInModal).modal('show');
  }
});
