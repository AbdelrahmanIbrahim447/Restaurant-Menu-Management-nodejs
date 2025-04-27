const validateLoginInput = (username, password) => {
    const errors = {};
    
    if (!username || username.trim() === '') {
      errors.username = 'Username is required';
    }
  
    if (!password || password === '') {
      errors.password = 'Password is required';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };
  
  module.exports = {
    validateLoginInput,
  };