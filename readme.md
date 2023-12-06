# Node.js Authentication System

Welcome to the Node.js Authentication System, a robust solution for implementing user authentication in your Node.js applications. This system integrates seamlessly with MongoDB and provides features such as user signup, signin, signout, password reset, and Google social authentication.

## Features

- **User Signup and Signin**: Users can securely register and log in using their email addresses.
  
- **Signout**: Implemented functionality for users to log out.

- **Password Reset**: Users can reset their passwords securely after signing in.

- **Encrypted Password Storage**: Passwords are securely stored in the database using encryption.

- **Google Social Authentication**: Supports Google login/signup for a seamless user experience.

- **Error Handling**: Notifications for unmatching passwords during signup and incorrect passwords during signin.



## Prerequisites

Before you start, ensure you have the following installed:

- Node.js and npm
- MongoDB

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ashishthotwe07/Nodejs-Authentication-System.git
    cd Nodejs-Authentication-System
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Environment Variables:**

    Create a `.env` file in the root of the project and add the following:

    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.rrid8sk.mongodb.net/?retryWrites=true&w=majority
    GOOGLE_CLIENT_ID='809869379324-55pqcl9q9qq0np0r3oqufcs6jultl6ef.apps.googleusercontent.com'
    GOOGLE_CLIENT_SECRET='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'
    ```

4. **Run the Application:**

    ```bash
    npm start
    ```

    The app will be running at [http://localhost:8000](http://localhost:8000).

## Folder Structure

- `config`: Configuration files (e.g., database connection).
- `controllers`: Request handlers for different routes.
- `models`: Database models.
- `public`: Static files (stylesheets, scripts, images).
- `routes`: Route definitions.
- `views`: EJS templates for rendering pages.

## Usage

- Visit [http://localhost:8000/signup](http://localhost:8000/signup) to sign up.
- Visit [http://localhost:8000/](http://localhost:8000/) to sign in.
- Explore other routes for password reset, signout, and Google login.

## Contributing

Feel free to contribute to the project. Create a fork, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.