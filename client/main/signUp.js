// Sign Up partial template initialization.
Template.signUp.onCreated(function () {
  var self = this;

  // Show error UI if username is invalid. Using a session variable because we 
  // need this data in a callback.
  Session.set('invalidUsername', false);

  // Show error UI if password is invalid. Using a session variable because we 
  // need this data in a callback.
  Session.set('invalidPassword', false);
});

// Sign Up partial template helpers.
Template.signUp.helpers({
  invalidUsername: function () {
    return Session.get('invalidUsername');
  },
  invalidPassword: function () {
    return Session.get('invalidPassword');
  }
});

// Sign Up partial template events.
Template.signUp.events({
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
    var newUser = {};
    var password = event.target.password.value.trim();
    var signUpModal = template.find('#signUpModal');
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

    newUser = {
      username: username,
      password: password
    };

    Accounts.createUser(newUser, function (error) {
      if (error) {
        switch (error.error) {
          case 403:
            // error.reason = "Username already exists", so an incorrect username.
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
        // Use jQuery to access Bootstrap's modal functionality.
        $(signUpModal).modal('hide');
      }
    });
  }
});
