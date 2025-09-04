# Task-Management

A modern event and task management application designed to streamline planning, execution, and attendee engagement for both online and in-person events.

## Overview

Task-Management (Event-Ally) is an intuitive platform where users can create, manage, and track events efficiently. The application is built with TypeScript and leverages [Appwrite](https://appwrite.io/) for backend services. It provides rich features for organizing events, tracking registrations, managing sponsors, and communicating with attendees.

Live Demo: [https://eventally.vercel.app](https://eventally.vercel.app)

## Features

- **Event Creation:** Easily create events with detailed information including agenda, type (In Person/Online), pricing, technical requirements, and more.
- **Sponsor Management:** Add sponsors for events with their details and URLs.
- **Attendee Registration:** Collect attendee information and manage approvals for event participation.
- **Social Connectivity:** Add social media links (Twitter, LinkedIn, Instagram, Website) for each event and host.
- **Event Listing:** Browse all created events, view details, and delete events as needed.
- **Statistics & Export:** View attendee stats per event and export registration data as CSV.
- **Approval Workflow:** Accept or reject registrations, with automated email notifications to attendees.
- **Responsive Design:** Mobile-friendly and optimized for all device sizes.

## Technologies Used

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- **Backend:** Appwrite
- **Email Service:** SendGrid API (for notifications)
- **Icons:** react-icons
- **CSV Export:** Custom CSV downloader component

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rohit-RA-2020/Task-Management.git
   cd Task-Management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file and add your Appwrite and SendGrid credentials.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

- `app/create/` – Event creation form and logic
- `app/events/` – Event listing and details
- `app/stats/` – Attendee statistics and registration management
- `app/constants/` – Appwrite configuration and constants
- `app/components/` – Shared UI components (header, etc.)
- `public/` – Static assets

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and new features.

## License

This project currently does not specify a license. Please contact the owner for usage details.

## Author

- Rohit-RA-2020 ([GitHub Profile](https://github.com/Rohit-RA-2020))
