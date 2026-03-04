# Walkers – Book Tracking Application

A Vue 3 + Nuxt application that recreates the **“My Books” UI** from the Walkers Full-Stack Developer technical assessment.

Repository:  
https://github.com/shannabarnard/book-tracking-app

The goal of this project is to demonstrate:

- Clean **component architecture**
- **Reusable Vue components**
- Modern **Nuxt 4 + TypeScript** frontend development
- Responsive UI using **TailwindCSS**
- Integration with a mock API

The application allows users to manage a collection of books including adding, editing ratings/comments, searching, sorting, and viewing details.

---

# Tech Stack

## Frontend

- **Vue 3**
- **Nuxt 4**
- **TypeScript**
- **TailwindCSS 4**
- **Nuxt UI**
- **Iconify icons**

## Development Tools

- **ESLint**
- **Prettier**
- **Vue TSC (type checking)**
- **PNPM**

## Testing

- **Vitest + Vue Test Utils**

---

# Features

- My Books dashboard
- Sidebar navigation
- Add Book modal
- Edit Book modal (rating and comments only)
- Delete confirmation modal
- Search books by **title or author**
- Sort books by **title**
- Notes indicator when comments exist
- Responsive UI layout
- Mock API integration

Additional pages:

- **Analytics** – sample book statistics
- **Settings** – example preferences page

---


### Key Architectural Choices

**Composable API Layer**

`useBooksQuery` handles:

- fetching books
- adding books
- editing books
- deleting books

This keeps API logic separate from UI components.

**Reusable Components**

Examples include:

- `BookCard`
- `BookToolbar`
- `AddBookModal`
- `EditBookModal`
- `DeleteBookModal`

**Mock Backend**

Nuxt server routes simulate the REST API required for the assessment.

---

# Installation

## 1. Clone the repository


git clone https://github.com/shannabarnard/book-tracking-app.git

npm install

npm run dev

