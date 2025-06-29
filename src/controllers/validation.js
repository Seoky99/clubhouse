function passwordConfirmation(value, {req}) {
    return value === req.body.password; 
}

async function userExists(value) {
    const rows = await db.findUser(value); 
    
    if (rows.length > 0) {
        throw new Error('There is already an user with this username.');
    }
}

exports.validateUser = [
    body('fname').notEmpty().withMessage('Please enter your first name.').bail().isAlpha().withMessage('Please enter a valid first name').bail()
        .isLength({min: 2, max: 20}).withMessage('Please enter a valid length of name'),
    body('lname').notEmpty().withMessage('Please enter your last name.').bail().isAlpha().withMessage('Please enter a valid last name').bail()
        .isLength({min: 2, max: 20}).withMessage('Please enter a valid length of name'),
    body('username').notEmpty().withMessage('Please enter your username').bail()
        .custom(userExists),
    body('email').notEmpty().withMessage('Please enter your email.').bail().isEmail().withMessage('Please enter a valid email address').bail()
        .isLength({min: 6, max: 30}).withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Please enter your password'),
    body('confirm-password').notEmpty().withMessage('Please confirm your password.').custom(passwordConfirmation).withMessage('The passwords did not match!')
]; 