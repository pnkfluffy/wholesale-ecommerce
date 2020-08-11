const isEmpty = require('is-empty')

module.exports = function validatePass (data) {
  // console.log(data)
  let errors = []
  // Convert empty fields to an empty string for Validator functions
  const oldPass = !isEmpty(data.oldPass) ? data.oldPass : ''
  const newPass = !isEmpty(data.newPass) ? data.newPass : ''
  const newPassConfirm = !isEmpty(data.newPassConfirm)
    ? data.newPassConfirm
    : ''

  // Check Email
  if (isEmpty(oldPass)) {
    errors = ['oldPass', 'Your current password is required']
  } else if (isEmpty(newPass)) {
    errors = ['newPass', 'New password is required']
  } else if (isEmpty(newPassConfirm)) {
    errors = ['newPass', 'You need to confirm your new password']
  }
  if (isEmpty(errors)) {
    const regexLetters = /\d/
    const regexNumbers = /[a-zA-Z]/
    if (newPass !== newPassConfirm)
      errors = ['newPass', "Your new password doesn't match the confirmation"]
    else if (newPass === oldPass)
      errors = ['newPass', 'This is already your password']
    else if (
      newPass.length < 6 ||
      !regexLetters.test(newPass) ||
      !regexNumbers.test(newPass)
    )
      errors = [
        'newPass',
        'New password must have at least 6 characters, one letter, and one number'
      ]
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
