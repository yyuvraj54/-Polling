# Poll Application

## What is this app?
The Poll Application is a platform where users can cast their votes for a given set of candidates. The application ensures secure and fair voting, allowing users to participate in polls while providing real-time updates on vote counts.

## Functionality
1. **User Sign In / Sign Up**: Users can create a new account or log in to an existing one.
2. **View Candidates**: Users can see a list of candidates.
3. **Cast Vote**: Users can vote for one of the candidates.
4. **Live Vote Counts**: A route shows the list of candidates and their live vote counts, sorted by the number of votes.
5. **Unique Government ID**: User data must include their unique government ID proof named Aadhar Card Number.
6. **Admin Control**: Admins can control the list of candidates but cannot vote.
7. **Change Password**: Users can change their passwords.
8. **Login with Aadhar Card**: Users can log in using their Aadhar Card number and password.
9. **Admin Restrictions**: Admins cannot vote.

## Routes

### User Authentication
- **POST /signup**: Create a new user account.
- **POST /login**: Log in to an existing account using Aadhar Card number and password.

### Voting
- **GET /candidates**: Get the list of candidates.
- **POST /vote/:candidateId**: Vote for a specific candidate.

### Vote Count
- **GET /vote/counts**: Get the list of candidates sorted by their vote counts.

### User Profile
- **GET /profile**: Get the user's profile information.
- **POST /profile/password**: Change the user's password.

### Admin Candidate Management
- **POST /candidate**: Create a new candidate.
- **PUT /candidate/:candidateID**: Update an existing candidate.
- **DELETE /candidate/:candidateID**: Delete a candidate from the list.

## Live Service
The Poll Application is live and can be accessed at [https://polling-2sce.onrender.com](https://polling-2sce.onrender.com).

### User Authentication Example
- POST /User/signup : Create a new user account.
  - **Request Body**:
    ```json
    {
      "name": "rahul",
      "age": 28,
      "role": "voter",
      "mobile": "1122334455",
      "email": "rahul@example.com",
      "address": "789 Oak St, Springfield",
      "aadharCardNumber": 445678901234,
      "password": "pass",
      "isVoted": false
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "generatedObjectId",
      "name": "rahul",
      "age": 28,
      "role": "voter",
      "mobile": "1122334455",
      "email": "rahul@example.com",
      "address": "789 Oak St, Springfield",
      "aadharCardNumber": 445678901234,
      "password": "$2a$10$Aalv7p5H/2OpYAQbYx98VOzUCuRoWoAJvm1EDoQbnI/DtowOnJtQa",
      "isVoted": false,
      "__v": 0
    }
    ```
- **POST /login**: Log in to an existing account using Aadhar Card number and password.


## How to Run the Application
1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Set up the environment variables:
   - `JWT_SECRET`: Your secret key for JWT.
   - `DB_CONNECTION`: Your MongoDB connection string.
4. Start the server using `npm start`.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Hosting**: Render.com

## Future Enhancements
- Implement additional security measures.
- Add more detailed analytics for vote counts.
- Introduce a user-friendly UI for better interaction.

## License
This project is licensed under the MIT License.

Feel free to contribute to this project by submitting a pull request or opening an issue. Your feedback and contributions are highly appreciated!
