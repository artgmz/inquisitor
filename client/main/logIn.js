// Log In partial template initialization.
Template.logIn.onCreated(function () {
  var self = this;

  // Show error UI if username is invalid. Using a session variable because we 
  // need this data in a callback.
  Session.set('invalidUsername', false);

  // Show error UI if password is invalid. Using a session variable because we 
  // need this data in a callback.
  Session.set('invalidPassword', false);
});

// Log In partial template helpers.
Template.logIn.helpers({
  invalidUsername: function () {
    return Session.get('invalidUsername');
  },
  invalidPassword: function () {
    return Session.get('invalidPassword');
  }
});

// Log In partial template events.
Template.logIn.events({
  'keyup input[name$="username"]': function () {
    // Remove invalidity when invalid input is modified.
    if (Session.get('invalidUsername')) {
      Session.set('invalidUsername', false);
    }
  },
  'keyup input[name$="password"]': function () {
    // Remove invalidity when invalid input is modified.
    if (Session.get('invalidPassword')) {
      Session.set('invalidPassword', false);
    }
  },
  'submit form': function (event, template) {
    var logInModal = template.find('#logInModal');
    var password = event.target.password.value.trim();
    var username = event.target.username.value.trim();

    event.preventDefault();

    // Username field is required.
    if (username === '') {
      Session.set('invalidUsername', true);
    }

    // Password field is required.
    if (password === '') {
      Session.set('invalidPassword', true);
    }

    // If either required field is empty, don't continue.
    if (username === '' || password === '') {
      return;
    }

    Meteor.loginWithPassword(username, password, function (error) {
      if (error) {
        switch (error.error) {
          // error.reason = "Match failed," so likely an incorrect username.
          case 400:
              Session.set('invalidUsername', true);
            break;
          case 403:
            if (error.reason === 'Incorrect password') {
              Session.set('invalidPassword', true);
            }
            // error.reason = "User not found", so likely an incorrect username.
            else {
              Session.set('invalidUsername', true);
            }
            break;
          default:
            // Something's really wrong, so error out both fields.
            Session.set('invalidUsername', true);
            Session.set('invalidPassword', true);
            break
        }
      }
      else {
        // Use jQuery to access Bootstrap's modal functionality.
        $(logInModal).modal('hide');
      }
    });
  }
});
