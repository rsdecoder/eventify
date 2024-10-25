# EVENTIFY APP

<p>An interactive web application designed to manage events with an intuitive interface, role-based authentication, and seamless integration with the Eventbrite API. The app allows users to browse and register for events while enabling staff to create and publish events.</p>

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Folder Structure](#folder-structure)
8. [Future Improvements](#future-improvements)
9. [Contributing](#contributing)
10. [License](#license)

### Features

- **Event Listing & Search**: Users can view and search for events by category.
- **Role-Based Authentication**: Using Firebase authentication, staff can create events while regular users can only register. One can also sign up as user or staff but staff sign up will require an organization ID.
- **Event Creation & Management**: Staff users can add events through the app.
- **Eventbrite Integration**: Fetch events from Eventbrite under an organization ID and post events to the eventbrite api.
- **GoogleCalendarIntegration**: Users can add the event to their google calendars by signing in to their google mail.

### Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Firebase (Firestore, Authentication), Eventbrite API
- **Others**: npm - Node package manager, MUI - React component library

### Installation - How to run this app locally

1. Clone the git repository:

   > <code>git clone https://github.com/your-username/events-management-app.git
   > cd SE/events-platform</code>

2. Install Dependencies

   > <code>npm install</code>

3. Set up Firebase and Eventbrite accounts to get API keys and OAuth credentials.

4. Configure environment variables as described in the next section.

5. Start the development server:

   > <code>npm run dev</code>

### ENVIRONMENT VARIABLES

Create a .env file in the root directory and include the following:

> <code><br>REACT_APP_EVENTBRITE_ORGANIZATION_ID = "your-eventbrite-organization-id"<br> (Refer to eventbrite API reference for organization ID)
> REACT_APP_EVENTBRITE_API_TOKEN = "your-eventbrite-api-key"<br>
> REACT_APP_GOOGLE_CLIENT_ID = "your-google-api-client-id"<br>
> REACT_APP_GOOGLE_API_KEY = "your-google-api-client-secret"
> REACT_APP_FIREBASE_KEY= "your-firebase-api-key"<br>
> REACT_APP_FIRESBASE_AUTH_DOMAIN = "your-firebase-auth-domain"<br>
> REACT_APP_PROJECT_ID = "your-firebase-project-id"<br></code>

### Usage

1. Start Development Server: Run npm run dev to launch the app locally.
2. User Authentication: Create user roles through Firebase.
3. Create and Manage Events:
   - Staff users can create events from the app's Create Event page.
   - Users can view and register for available events.

### API Endpoints

#### Eventbrite API:

- Fetch Events: <code>/v3/organizations{organization_id}/events</code>
- Create Event: /v3/organizations/{organization_id}/events/
- Venue Management: /v3/organizations/{organization_id}/venues/
- > Note!
  > Replace {organization_id} with your Eventbrite organization ID.

## Folder Structure

```plaintext
├──SE/
    ├──events-platform/
        ├── public/
        │   ├── index.html              # Main HTML file
        │   ├── favicon.ico             # Favicon for the app
        │   └── assets/                 # Static assets (images, fonts, etc.)
        │       ├── images/             # Images used in the app
        │       └── icons/              # Icons for buttons, etc.
        ├── src/
        │   ├── components/             # Reusable components
        │   │   ├── Navbar.jsx          # Navigation bar component
        │   │   ├── Footer.jsx          # Footer component
        │   │   └── EventCard.jsx       # Component for displaying an event
        │   ├── pages/                  # Pages for routing
        │   │   ├── Home.jsx            # Home page
        │   │   ├── Login.jsx           # User login page
        │   │   └── AddEvent.jsx        # Page for adding events
        │   ├── hooks/                  # Custom hooks
        │   │   └── useAuth.js          # Hook for authentication
        │   ├── context/                # Context API files
        │   │   └── AuthContext.js      # Authentication context
        │   ├── utils/                  # Utility functions
        │   │   └── api.js              # API calls (Eventbrite, Firebase, etc.)
        │   ├── styles/                 # CSS styles
        │   │   └── App.css             # Main application styles
        │   ├── App.js                  # Main app component
        │   ├── index.js                # Entry point for the application
        │   └── firebase.js             # Firebase configuration and initialization
        ├── .env                         # Environment variables
        ├── .gitignore                   # Files and directories to ignore by Git
        ├── package.json                 # Project dependencies and scripts
        └── README.md                    # Documentation for the project
        ```
