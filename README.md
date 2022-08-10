# Meeting Planner

## 1 - Project Description

The Meeting Planner allows users to set up & share meetings, coordinate their availability. Importantly, users can link their personal calendars & use the app to automatically fill in their availability this makes it especially convenient for people with a busy calendar. 

## 2 - Goals Checklist

The goals are written as user stories. 

### Minimal requirements

1. As a meeting organizer, I want to be able to create a new meeting with a given span (possible days/time) and get a unique link for it - ✅
2. As a meeting attendee, I want to be able to go to the link shared by the meeting organizer and access meeting title and notes - ✅
3. As a meeting attendee, I want to be able to go to that link as a guest and enter my availability by dragging my mouse across the calendar - ✅

### Standard requirements

1. As a user, I want to be able to use the website as a guest, or as a registered user if I want extra features[<sup>1</sup>](#footnotes) - ✅
2. As a registered user, I want to be able to delete my account and update account information (Settings Page) - ✅
5. As a registered user, I want to be sent an email verification to change my password when I forget the password - ✅
7. As an user, I want to be able to create an account through some external authentication service  - ✅
8. As an user, I want to be able to log in to my account through the same external authentication service - ✅
9.  As a user, I would like my private data to not be accessible through API by unauthorized users - ✅

### Stretch Requirements

1. As a user, I want to be able to import my availability from a link to my personal availability ICS file - ✅
2. As a user, I want to be able to coordinate meetings with people from any time zone - ✅
3. All meeting attendees should be able to vote for the best meeting time from all the options provided by the website - ❌
4. As a registered user, I want to be able to change the meeting span after creating it by logging into the account I used to create it - ❌
5. As a meeting organizer, I want to be able to remove a user from a meeting - ❌

## 3 - Tech Used from Class

 - Unit 1 - HTML, CSS, JS
   We use HTML to create our page templates, JavaScript to fill in those templates and make them functional, and use CSS to style our pages. We use a JS framework called react to create our app, and HTML is usually used in JSX with react for templates. 

 - Unit 2 - React & Redux
   We create a list of React components (eg. Nav bar, SignUp/login form) and each of them is responsible for one function of our app,then we put them together to form our app. Since these components are separate from each other, we can modify one component without affecting other components and make multiple instances of each one. We use Redux to track/modify the state and dispatch API calls for some of our app’s pages (the ones that need to coordinate state between several components. We use React hooks such as useState and useEffect for the other pages for simplicity.

 - Unit 3 - Node & Express
              We create RESTful CRUD (Create, Read, Update, Delete) API requests, for the data stored in our backend, using Node.js to run JavaScript outside of a browser and Express as a framework for managing our routes and middleware. We used some builtin packages as well as created our own middleware (for things such as verifying the user using session cookies and JWTs) to abstract functionality across routes.

 - Unit 4 - NoSQL with MongoDB
   We use MongoDB with mongoose as our ORM on Node.js, so that we can store our users’/meetings’ data in MongoDB, and we can also update/delete/get (crud operations) users’/meetings’ data from MongoDB.


 - Unit 5 - Release Engineering 
   For CI/CD, we integrated Cloudflare and Heroku auto deployment. We deployed our app’s server on Heroku,and frontend on cloudflare so that we can access our app on the internet using the link that heroku gives us. 

## 4 - Above & Beyond Functionalities

#### Support multiple time zones
The app allows the user to enter their availability from the timezone they are in, or any specific timezone they select from the dropdown menu. 

To achieve this, all data entities are saved as UTC timestamps on the backend, and are only converted to date strings in the frontend when timezone is specified. When the user inputs some available/unavailable slots, only the corresponding UTC time is sent to the server for cross-timezone consistency. 

#### Using External APIs (firebase)
All cases of user log-in are handled with the Firebase API. This ensures the security of user login information. 

#### Authenticated Endpoints & Obscure Server-side Information
To ensure that users do not gain access to other users’ information, all API calls to our server have embedded the authentication header provided by Firebase. 
For server endpoints also created a middleware to remove all fields that we do not wish to be exposed to the frontend, such as database ID and version number.  


#### Fully Responsive Frontend
We tested our website in multiple window sizes during development, and also took care to reorder components for better usability in smaller window sizes. 


## 5 - Next Steps
We will send out the deployed version of the app, both for testing with a higher volume of users, and for user-testing for refining our designs. 
In terms of features, we plan to support more features such as changing meeting span after it’s created, voting on a ‘best time’, and sharing the meeting link to attendees. 


## 6 - List of Contributions
Tom Mo: Created time range picker and date selector, created restful requests for meeting at the backend, implemented timezone support. 

Sophie Chai: create navbar, style all the pages, link our app with MongoDB, create restful requests for meeting and users on the backend, create user account page and about us page, dispatch “import ICS” function at the frontend 

<<<<<<< HEAD
Ramit Kataria: Use firebase for user authentication, link backend and mongodb to firebase, deploy our app on heroku and cloudflare
=======
Ramit Kataria: Use firebase for user authentication, link backend and mongodb to firebase, deploy our app on heroku and cloudflare, created drag-to-select component for availability table
>>>>>>> 6dca98a10f5d666e145cd97385283e7691c2c2d1

May Tang: create forgetpassword button for the signIn page, and create the “Import ICS” function  at the backend, style SignUp/login page a bit
