# Meeting Planner

## 1 - Project Description

> *TODO: change to 2-3 sentence description of app*

### Who is it for?

People with busy calendars who need to schedule for group events/meetings

### What will it do? (What "human activity" will it support?)

Allow users to set up meetings schedules & automatically fill in availability by linking their personal calendars

### What type of data will it store?

- Meeting sessions (a calendar with availability information)
- List of users in each meeting session
- User accounts (login id & password)
- Personal calendars for each user, generated from an external source

### What will users be able to do with this data?

- Create meeting sessions
- Pull personal calendar from another data source
- Invite users
- Finalize a time on a meeting session

### What is some additional functionality you can add/remove based on time constraints?

- Polling on available times
- Timezone support
- Sending notifications once the meeting time is finalized
- Display event information on event page (eg. links, embedded map)

## 2 - Goals Checklist

> *TODO: statement of goals + indication of what is completed*

### Minimal requirements

1. As a meeting organizer, I want to be able to create a new meeting with a given span (possible days/time) and get a unique link for it
2. As a meeting attendee, I want to be able to go to the link shared by the meeting organizer and access meeting title and notes
3. As a meeting attendee, I want to be able to go to that link as a guest and enter my availability by dragging my mouse across the calendar

### Standard requirements

1. As a user, I want to be able to use the website as a guest, or as a registered user if I want extra features[<sup>1</sup>](#footnotes)
2. As a registered user, I want to be able to delete my account and update account information (Settings Page)
5. As a registered user, I want to be sent an email verification to change my password when I forget the password
7. As an attendee, I want to be able to create an account through some external authentication service 
8. As an attendee, I want to be able to log in to my account through the same external authentication service
10. As a user, I would like my private data to not be accessible through API by unauthorized users

### Stretch Requirements

1. All meeting attendees should be able to vote for the best meeting time from all the options provided by the website
2. As the meeting organizer, I want to be able to limit access to the meeting info and availability to registered users with given email addresses
3. As a user, I want to be able to import my availability from a link to my personal availability ICS file
4. As a registered user, I want to be able to change the meeting span after creating it by logging into the account I used to create it
5. As a meeting organizer, I want to be able to remove a user from a meeting

## 3 - Tech Used from Class

> *TODO: Description, 2-3 sentences each, on how tech from Units 1-5 are used in the project.
> (Ideally) Usage of tech includes best practices. Code is clean and clear. Description of usage explains in-depth how the technology has made the app better. Possibly a mention of how it compares to other similar tech. Documentation demonstrates a solid understanding of the tech learned throughout the term, and its purpose in creating a production-level full-stack web application.*

 - Unit 1 - HTML, CSS, JS
 - Unit 2 - React & Redux
 - Unit 3 - Node & Express
 - Unit 4 - NoSQL with MongoDB
 - Unit 5 - Release Engineering 

## 4 - Above & Beyond Functionalities

> *TODO: descriptions for each point*

 - Fully Responsive
 - Using External APIs (firebase)
 - Did research for UI/UX (?????)
 - Support multiple timezones


## 5 - Next Steps


## 6 - List of Contributions
