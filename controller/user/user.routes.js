import express from 'express';
import UserController from './user.controller.js';
import { auth } from '../../middleware/auth.js';
import passport from 'passport';

// Create an Express router
const userRouter = express.Router();

// Create an instance of the UserController
const userController = new UserController();

// Route for rendering the sign-up page
userRouter.get('/signup', userController.getSignUp);

// Route for rendering the sign-in page
userRouter.get('/', userController.getSignIn);

// Route for handling user sign-out
userRouter.get('/signout', userController.logout);

// Route for rendering the home page (requires authentication)
userRouter.get('/home', auth, userController.getHome);

// Route for rendering the reset password page (requires authentication)
userRouter.get('/getreset', auth, userController.getReset);

// Route for handling the reset password form submission (requires authentication)
userRouter.post('/reset_password', auth,  userController.postResetPassword);

// Route for handling user sign-in using local strategy
userRouter.post('/signin', passport.authenticate('local', { failureRedirect: '/' , failureFlash:'username/password incorrect '}), userController.postSignIn);

// Route for handling user sign-up
userRouter.post('/postsignup',userController.postSignUp);

// Routes for handling Google OAuth authentication
// Update the callback URL to match the one in Google Developer Console
userRouter.get('/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.get('/oauth/callback', passport.authenticate('google', { failureRedirect: '/' }), userController.postSignIn);

// Export the userRouter for use in other parts of the application
export default userRouter;
