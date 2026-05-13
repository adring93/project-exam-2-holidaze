# Holidaze

Holidaze is a modern accommodation booking web application built for Noroff Project Exam 2.

The application allows visitors to browse venues, search for stays, view venue details, register, log in, create bookings, manage profiles, and gives venue managers tools to create, edit, delete, and view bookings for their venues.

## Live site

Live site link will be added after deployment.

## GitHub repository

https://github.com/adring93/project-exam-2-holidaze

## Built with

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Noroff Holidaze API

## Features

### Visitors

- View a list of venues
- Search for venues
- View a venue by ID
- View venue availability and booked dates
- Register as a customer
- Register as a venue manager

### Customers

- Log in and log out
- Create bookings
- View upcoming bookings
- Update profile avatar

### Venue managers

- Log in and log out
- Create venues
- Edit venues
- Delete venues
- View upcoming bookings for managed venues
- Update profile avatar

## Getting started

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the root of the project.

Add the following variable:

```env
VITE_NOROFF_API_KEY=your_api_key_here
```

The real API key should not be committed to GitHub.

### Run locally

```bash
npm run dev
```

The project will usually run at:

```txt
http://localhost:5173/
```

### Build project

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project structure

```txt
src
├─ components
│  ├─ bookings
│  ├─ forms
│  ├─ layout
│  ├─ ui
│  └─ venues
├─ context
├─ hooks
├─ pages
├─ services
├─ types
└─ utils
```

## API

This project uses the official Noroff API v2 Holidaze endpoints.

Base URL:

```txt
https://v2.api.noroff.dev
```

Main endpoint groups used:

- `/auth/register`
- `/auth/login`
- `/holidaze/venues`
- `/holidaze/bookings`
- `/holidaze/profiles`

## Manual testing

The project is manually tested against the required user stories from the Project Exam 2 brief.

Tested user flows include:

- Visitor can view venues
- Visitor can search venues
- Visitor can open a venue details page
- Visitor can view availability and booked dates
- User can register as a customer
- User can register as a venue manager
- User can log in and log out
- Customer can create a booking
- Customer can view upcoming bookings
- User can update profile avatar
- Venue manager can create a venue
- Venue manager can edit a venue
- Venue manager can delete a venue
- Venue manager can view bookings for managed venues

## Validation before submission

Before final submission, the project should be checked with:

- HTML Validator
- Lighthouse
- WAVE accessibility testing

## Author

Designed and developed by Adrian Ingvartsen for Noroff Project Exam 2.