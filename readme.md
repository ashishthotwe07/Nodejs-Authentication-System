# Node.js Authentication System

A scalable Node.js authentication system with MongoDB integration, supporting user signup, signin, signout, password reset, and Google social authentication.

## Features

- User signup with email
- User signin with email
- User signout
- Password reset after signin
- Encrypted storage of passwords in the database
- Google login/signup (Social authentication)
- Forgot password (via email or reset password link)
- Notifications for unmatching passwords during signup and incorrect password during signin
- (Bonus) reCAPTCHA on signup and login

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set environment variables:**

    Create a `.env` file in the root of the project and add the following:

    ```env
    MONGO_URI=your_mongo_db_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    The app will be running at [http://localhost:3000](http://localhost:3000).

## Folder Structure

- `config`: Configuration files (e.g., database connection).
- `controllers`: Request handlers for different routes.
- `models`: Database models.
- `public`: Static files (stylesheets, scripts, images).
- `routes`: Route definitions.
- `views`: EJS templates for rendering pages.

## Usage

- Visit [http://localhost:3000/signup](http://localhost:3000/signup) to sign up.
- Visit [http://localhost:3000/signin](http://localhost:3000/signin) to sign in.
- Explore other routes for password reset, signout, and Google login.

## Contributing

Feel free to contribute to the project. Create a fork, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
