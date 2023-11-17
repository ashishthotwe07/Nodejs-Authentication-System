// Flash middleware to handle success and error messages
const flashMiddleware = (req, res, next) => {
  // Set local variables for success and error messages
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  // Move to the next middleware or route handler
  next();
};

export default flashMiddleware;
