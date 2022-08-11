# Meeting Planner

## 1 - Project Description

The Meeting Planner allows users to set up & share meetings, coordinate their availability. Importantly, users can link
their personal calendars & use the app to automatically fill in their availability this makes it especially convenient
for people with a busy calendar.

## 2 - Goals Checklist

The goals are written as user stories.

### Minimal requirements

1. As a meeting organizer, I want to be able to create a new meeting with a given span (possible days/time) and get a
   unique link for it - ✅
2. As a meeting attendee, I want to be able to go to the link shared by the meeting organizer and access meeting title
   and notes - ✅
3. As a meeting attendee, I want to be able to go to that link as a guest and enter my availability by dragging my mouse
   across the calendar - ✅

### Standard requirements

1. As a user, I want to be able to use the website as a guest, or as a registered user if I want extra
   features - ✅
2. As a registered user, I want to be able to delete my account and update account information (Settings Page) - ✅
5. As a registered user, I want to be sent an email verification to change my password when I forget the password - ✅
7. As an user, I want to be able to create an account through some external authentication service - ✅
8. As an user, I want to be able to log in to my account through the same external authentication service - ✅
9. As a user, I would like my private data to not be accessible through API by unauthorized users - ✅

### Stretch Requirements

1. As a user, I want to be able to import my availability from a link to my personal availability ICS file - ✅
2. As a user, I want to be able to coordinate meetings with people from any time zone - ✅
3. All meeting attendees should be able to vote for the best meeting time from all the options provided by the website -
   ❌
4. As a registered user, I want to be able to change the meeting span after creating it by logging into the account I
   used to create it - ❌
5. As a meeting organizer, I want to be able to remove a user from a meeting - ❌

## 3 - Tech Used from Class

- Unit 1 - HTML, CSS, JS
  We use HTML in JSX to create our page templates, JavaScript to fill in those templates and make them functional, and
  CSS
  to style our pages. We used a JS framework called react to render those templates to use render those HTML templates
  with the filled in information to the DOM for the web browsers to understand it. There are essentially no alternives
  to these are the standards adopted by all the browsers.

- Unit 2 - React & Redux
  We created a separate React component for each UI element that we need to make multiple copies of or that is
  sematically separate from other elements. Each component is responsible for rendering itself with it's own state,
  without having to reload the page. We used Redux to track/modify the state and dispatch API calls for some of our
  app’s pages (the ones that need to coordinate state
  between several components. We use React hooks such as useState and useEffect for the other pages for simplicity.
  There are many alternative frameworks for these tasks but React is the most popular one and consequently has the most
  guides available online which is enough of a reason to choose it over other ones.

- Unit 3 - Node & Express
  We create RESTful CRUD (Create, Read, Update, Delete) API requests, for the data stored in our backend, using Node.js
  to run JavaScript outside of a browser and Express as a framework for managing our routes and middleware. We used some
  builtin packages as well as created our own middleware (for things such as verifying the user using session cookies
  and JWTs) to abstract functionality across routes. Node + Express is the most popular backend combo but there are
  other ones that we'd like to expore such as Golang which is gaining popularity especially for high-performance
  servers.

- Unit 4 - NoSQL with MongoDB
  We used MongoDB with mongoose as our ORM on Node.js, so that we can store our users’/meetings’ data in MongoDB, and we
  can also update/delete/get (crud operations) users’/meetings’ data from MongoDB. This is NoSQL database which provides
  us flexibility for fields in each document. This is very helpful in the development stages of an app since the
  sometimes schema changes required which are more convenient with NoSQL. However, as the product gets more mature, we'd
  go for a SQL database for more performance and a standardized schema across all rows and better built-in error
  checking.


- Unit 5 - Release Engineering
  For CI/CD, we implemented rules on GitHub to check for build status and have at least 1 review from another member
  before letting a PR be merged. For deployment, we used Cloudflare Pages for frontend to take advantage to Cloudflare's
  amazing CDN and DDoS-prevention proxy with the lowest latency across all the CDN we tested in different location
  throughout the world. We used Heroku for deploying the backend because of their features as part of their PaaS
  platform, such as review apps, which we used to automatically create a new Heroku app for each PR for easily testing
  new changes in the production environment.

## 4 - Above & Beyond Functionalities

### Support multiple time zones

The app allows the user to enter their availability from the timezone they are in, or any specific timezone they select
from the dropdown menu.

To achieve this, all data entities are saved as UTC timestamps on the backend, and are only converted to date strings in
the frontend when timezone is specified. When the user inputs some available/unavailable slots, only the corresponding
UTC time is sent to the server for cross-timezone consistency.

### Authenticated Endpoints & Obscure Server-side Information

We used the Firebase authentication services and database for managing users because it provided the most features out
of at least 15 different providers we looked into in a free plan. We used the firebase library on the frontend to
generate JWTs to send to the server which used the firebase admin API in a custom made middleware to verify the user
before returning any private information.

### Robust backend with error checking

We added checks for many different kinds of errors that could arise on each endpoint and provided appropriate HTTP
response codes in the response to make debugging easy and allow for community-made clients in the future. We also
abstracted away any repeated code to a middleware to avoid coupling.

### Fully Responsive Frontend

We tested our website in multiple window sizes during development, and also took care to reorder components for better
usability in smaller window sizes.

## 5 - Next Steps

We will send out the deployed version of the app, both for testing with a higher volume of users, and for user-testing
for refining our designs.
In terms of features, we plan to support more features such as changing meeting span after it’s created, voting on a
‘best time’, and sharing the meeting link to attendees. All of these should be fairly easy to implement as they are
essentially adding/changing pages to the client but take some time to implement that we didn't have enough of.

## 6 - List of Contributions

Tom Mo: Created time range picker and date selector, created restful requests for meeting at the backend, implemented
timezone support. Focused on creating meeting and availability page.

Sophie Chai: create navbar, style all the pages, link our app with MongoDB, create restful requests for meeting and
users on the backend, create user account page and about us page, dispatch “import ICS” function at the frontend.
Focused on many frontend pages.

Ramit Kataria: Use firebase for user authentication, link backend and mongodb to firebase database, deploy our app on
heroku and
cloudflare, robust server with error checking, custom drag-to-select component for availability table. Focused on
backend, intergrating with external services and release engineering.

May Tang: create forgetpassword button for the signIn page, and create the “Import ICS” function at the backend, style
SignUp/login page a bit. Focused on the frontend pages for user management and backend function for importing personal
calendars.
