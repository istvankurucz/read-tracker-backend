# Read Tracker Backend

A comprehensive book tracking and reading management API built with Node.js, Express, and Supabase. This backend service powers a reading tracker mobile application that helps users manage their personal book libraries, track reading progress, set goals, and connect with friends.

## 🚀 Main Features

### 📚 Book Management

-  **Local Book Library**: Create and manage personal book collections
-  **Book Search**: Search through local books and integrate with external Google Books API
-  **Book Information**: Store detailed book metadata including title, subtitle, authors, cover images, pages, language, ISBN, genre, and descriptions
-  **Book Reviews**: Rate and review books with comments and ratings (1-5 stars)
-  **Average Ratings**: Calculate and display average ratings and review counts for books

### 📖 Reading Progress Tracking

-  **Reading Sessions**: Track individual reading sessions with timestamps
-  **Reading Snapshots**: Capture reading progress at specific points in time
-  **Reading Status**: Monitor books as "in progress", "finished", or "not finished"
-  **Latest Readings**: Get recently updated reading activities

### 🎯 Goal Setting & Achievement

-  **Reading Goals**: Set yearly, monthly, or weekly reading targets
-  **Goal Tracking**: Monitor progress towards reading goals
-  **Multiple Goal Types**: Support for different goal timeframes and metrics

### 📋 List Management

-  **Custom Lists**: Create and manage personalized book lists
-  **System Lists**: Built-in lists like "Currently Reading", "Want to Read", etc.
-  **List Sharing**: Public and private list visibility options
-  **Book Organization**: Add/remove books from multiple lists

### 👥 Social Features (**TBD**)

-  **Friend System**: Send and manage friend requests
-  **Friendship Status**: Track pending, accepted, and rejected friend requests
-  **Friend Discovery**: Search for friends by name or ID
-  **Social Reading**: Share reading activities with friends

### 🔐 Authentication & User Management

-  **User Authentication**: Secure user registration and login
-  **User Profiles**: Manage user information and preferences
-  **Authorization**: Protected routes with JWT-based authentication

## 🛠️ Technologies Used

### Backend Framework

-  **Node.js** - Runtime environment
-  **Express.js** - Web application framework
-  **TypeScript** - Type-safe JavaScript development

### Database & ORM

-  **PostgreSQL** - Primary database
-  **Drizzle ORM** - Type-safe database toolkit
-  **Drizzle Kit** - Database migrations and schema management

### Authentication & Security

-  **JWT (JSON Web Tokens)** - Authentication tokens
-  **Supabase** - Authentication and storage services

### File Handling

-  **Multer** - File upload middleware for book cover images
-  **Image Processing** - Handle book cover photo uploads

### Validation

-  **Zod** - Runtime type validation and schema validation

### Development Tools

-  **nodemon** - Development server with auto-restart
-  **ESLint** - Code linting
-  **Prettier** - Code formatting

### External Integrations

-  **Axios** - HTTP client for external API calls
-  **Google Books API** - External book data integration

## 📁 Project Structure

```
src/
├── classes/           # Custom error classes
├── config/           # Configuration files (database, external services)
├── constants/        # Application constants
├── drizzle/          # Database schema and migrations
├── middlewares/      # Express middleware functions
├── routes/           # API route definitions
├── services/         # Business logic layer
├── types/            # TypeScript type definitions
└── utils/            # Utility functions and helpers
```

## 🔧 Key Features Implementation

### Database Design

-  **Relational Design**: Well-structured PostgreSQL database with proper foreign keys and constraints
-  **Join Tables**: Many-to-many relationships for books-authors, users-books, lists-books
-  **Data Integrity**: Database constraints and validations for data consistency

### API Architecture

-  **RESTful Design**: Clean, predictable API endpoints
-  **Middleware Pipeline**: Modular middleware for validation, authentication, and error handling
-  **Type Safety**: Full TypeScript implementation with strict typing

### Error Handling

-  **Custom Error Classes**: Structured error handling with custom `AppError` and `ValidationError` classes
-  **Centralized Error Middleware**: Consistent error responses across the API

### Data Validation

-  **Schema Validation**: Zod-based request validation for all endpoints
-  **Type-safe Operations**: Drizzle ORM ensures type safety at the database level

## 🔒 Security Features

-  **Protected Routes**: JWT-based authentication for secure endpoints
-  **Data Validation**: Comprehensive input validation and sanitization
-  **Error Handling**: Secure error responses without sensitive data exposure
-  **File Upload Security**: Secure image upload handling with validation

This backend provides a robust foundation for a modern book tracking application with social features, progress monitoring, and goal achievement systems.
