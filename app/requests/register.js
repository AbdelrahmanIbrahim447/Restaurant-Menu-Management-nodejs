const validateRegisterInput = (username, email, password) => {
    const errors = {};
    
    if (!username || username.trim() === '') {
      errors.username = 'Username is required';
    }
  
    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = 'Email must be a valid email address';
      }
    }
  
    if (!password || password === '') {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };
  
  module.exports = {
    validateRegisterInput,
  };