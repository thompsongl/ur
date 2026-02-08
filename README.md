# UR

> **U**sers & **R**oles

## Getting Started

1. **Start the Backend API**:
   - Ensure you have the latest version of Node.js.
   - Run the following commands to install dependencies and start the API:
     ```bash
     cd server
     npm install
     npm run api
     ```
2. **Start the Frontend**:
    - Run the following commands to install dependencies and start the client:
      ```bash
      cd client
      npm install
      npm run dev
      ```
    - Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tasks Overview

1. ✅ Setup the "Users" and "Roles" tab structure
2. ✅ Add the users table
3. ✅ Add support for filtering the users table via the "Search" input field
4. ✅ Add support for deleting a user via the "more" icon button dropdown menu
5. ✅ Add support for viewing all roles in the "Roles" tab
6. ✅ Add support for renaming a role in the "Roles" tab
7. ✅ [Bonus] Add pagination to the user table

## Stack

* Next.js - Framework & routing
  * React
  * TypeScript
* SWR - Data fetching & caching
* Radix UI Themes - Components & designing
* Claude Code - Bootstrapping & assisting

### Discussion

#### Distinct routing
  
User and roles have their own routes (`/user`, `/role` respectively), with the tabs (`TabNav` + `next/Link` not `Tabs`) triggering browser history changes. I'm a fan of real URLs, but we sacrifice some speed in the transition vs. pure SPA. It defintely offloads the implementaion details to Next.js, which is a choice.

#### Hooks

Data layer is all SWR-based hooks (`useUsers`, `useRoles`, `useDeleteUser`, `useRenameRole`). This is very powerful, and I certainly took this as an opportunity to learn the tool. My sense is that there is room for improvement, but I need more time to really get a feel for the tradeoffs vs. vanilla React + fetch. But the built-in optimistic rendering is so cool.

#### Command/action pattern (or dialog service)

Way beyond the scope here, but I found myself missing a pattern I'd built into recent apps: centralized registry for actions/commands, callable without having to place a configured dialog component, for instance, alongside every place its used. Sets everything up for CMD+K, which eventually someone will ask about.

#### More shared components

I foresee an `ActionsMenu` component abstraction. There are enough opinions baked into dialogs (e.g, bold button text, vertical spacing rhythm) that we could create some `Dialog` subcomponents. More variaton in error states (lower severity) could be nice, also.

#### Let's talk about it
  
  [A very-WIP PR 👀](https://github.com/thompsongl/ur/pull/1)

  * Pattern where the details view is a sheet/overlay/side panel (just a dialog, but what's a sheet besides a styled dialog?)
  * Used for both details and editing (not implemented but you can imagine)
  * Direct URLs for `:id`

