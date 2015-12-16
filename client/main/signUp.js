// Sign Up modal template initialization.
Template.signUp.onCreated(function () {
  var self = this;

  // Show invalidity errors. Session variables necessary for use in callbacks.
  Session.set('invalidUsername', false);
  Session.set('invalidPassword', false);
});

// Sign Up modal template helpers.
Template.signUp.helpers({
  invalidPassword: function () {
    return Session.get('invalidPassword');
  },
  invalidUsername: function () {
    return Session.get('invalidUsername');
  }
});

// Sign Up modal template events.
Template.signUp.events({
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
    var newUser = {};
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

    // Create a new user.
    newUser = {
      username: username,
      password: password
    };

    Accounts.createUser(newUser, function (error) {
      if (error) {
        switch (error.error) {
          case 403:
            Session.set('invalidUsername', true);
            break;
          default:
            // Something's really wrong, so error out both fields.
            Session.set('invalidUsername', true);
            Session.set('invalidPassword', true);
            break
        }
      }
      else {
        template.$('#signUpModal').modal('hide');
      }
    });
  }
});
