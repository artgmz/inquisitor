// Log In modal template initialization.
Template.logIn.onCreated(function () {
  var self = this;

  // Show invalidity errors. Session variables necessary for use in callbacks.
  Session.set('invalidUsername', false);
  Session.set('invalidPassword', false);
});

// Log In modal template helpers.
Template.logIn.helpers({
  invalidPassword: function () {
    return Session.get('invalidPassword');
  },
  invalidUsername: function () {
    return Session.get('invalidUsername');
  }
});

// Log In modal template events.
Template.logIn.events({
  'keyup input[name$="password"]': function () {
    // Hide error when invalid input is modified.
    if (Session.get('invalidPassword')) {
      Session.set('invalidPassword', false);
    }
  },
  'keyup input[name$="username"]': function () {
    // Hide error when invalid input is modified.
    if (Session.get('invalidUsername')) {
      Session.set('invalidUsername', false);
    }
  },
  'submit form': function (event, template) {
    var password = event.target.password.value.trim();
    var username = event.target.username.value.trim();

    event.preventDefault();

    // Check for data in required fields, stopping if any are empty.
    if (username === '') {
      Session.set('invalidUsername', true);
    }

    if (password === '') {
      Session.set('invalidPassword', true);
    }

    if (username === '' || password === '') {
      return;
    }

    Meteor.loginWithPassword(username, password, function (error) {
      if (error) {
        switch (error.error) {
          case 400:
              Session.set('invalidUsername', true);
            break;
          case 403:
            if (error.reason === 'Incorrect password') {
              Session.set('invalidPassword', true);
            }
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
        template.$('#logInModal').modal('hide');
      }
    });
  }
});
