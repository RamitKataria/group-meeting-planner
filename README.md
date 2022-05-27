# group-meeting-planner

## Project Description

**Who is it for?**
** People with busy calendars who need to schedule for group events/meetings.

**What will it do? (What "human activity" will it support?)**
1.Allow users to set up meetings schedules & automatically fill in availability by linking their personal calendars.

**What type of data will it store?**
1.Meeting sessions (a calendar with availability information)
2.List of users in each meeting session
3.User accounts (login id & password)
4.Personal calendars for each user, generated from an external source

**What will users be able to do with this data?**
1.Create meeting sessions
2.Pull personal calendar from another data source
3.Invite users
4.Finalize a time on a meeting session

**What is some additional functionality you can add/remove based on time constraints?**
1.polling on available times
2.timezone support
3.sending notifications once the meeting time is finalized
4.display event information on event page (eg. links, embedded map)
5.user account authentication



##Project task requirements

**Minimal requirements:**
1.As a meeting organizer, I want to be able to create a new meeting with a given span (possible days/time) and get a unique link for it
2.As a meeting attendee, I want to be able to go to the link shared by the meeting organizer and access meeting title and notes
3.As a meeting attendee, I want to be able to go to that link as a guest and enter my availability by dragging my mouse across the calendar

**Standard requirements:**
1.As a user, I want to be able to use the website as a guest, or as a registered user if I want extra features
2.As a registered user, I want to be able to delete my account
3.As an organizer, I want to be able to change the meeting span after creating it by logging into the account I used to create it
4.As a meeting organizer, I want to be notified by email after all team members have entered their availability.
5.As a meeting attendee, I want to be notified after the organizer has finalized the meeting time.
6.As a user, I want to be sent an email verification to change my password when I forget the password.
7.As a registered user, I want to be able to use my previously entered availability for new meetings


**Stretch requirements:**
1.All meeting attendees want to be able to vote for the best meeting time from all the options provided by our website
2.As an attendees, I want to be able to be send notifications once the meeting time is finalized
3.As an attendee, I want to be able to create an account through some external authentication service.
4.As an attendee, I want to be able to log in to my account through the same external authentication service
5.As the meeting organizer, I want to be able to limit access to the meeting info and availability to registered users with given email addresses
6.As a user, I want to read guidance about website’s functions before I first use the website.


##Minimal Requirements Breakdown


**Requirement 1:**
1.As a meeting organizer, I want to be able to create a new meeting with a given span (possible days/time) and get a unique link for it
2.Create a form for inputting dates and times, to be used for selecting span
3.Create a webpage where the meeting organizer can enter the meeting title and span
4.Create a Submit button to send the request (meeting title and span) to the server.
5.Store this information in the database with a randomly generated meeting ID and send this key in the response
6.Show the user a link containing this meeting ID so they they can send it to the meeting attendees


**Requirement 2:** 
1.As a meeting attendee, I want to be able to go to the link shared by the meeting organizer and access meeting title and notes
2.Create a webpage for displaying meeting info and already entered availability
3.Server should correctly redirect each unique link to its corresponding meeting page
4.Server should serve “incorrect meeting ID” page for invalid meeting ID




