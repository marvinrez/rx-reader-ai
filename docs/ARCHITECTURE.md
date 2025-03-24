# RX Reader AI Architecture

This document describes the technical architecture of the RX Reader AI application.

## System Overview

RX Reader AI is a modern web application designed to interpret medical prescriptions using AI. The system follows a client-server architecture with a React frontend and Node.js backend.

![Architecture Diagram](../attached_assets/Group%2018.png)

## Architecture Components

### 1. Frontend (Client)

The frontend is built with React and utilizes modern web technologies:

- **React**: Core UI library
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Component library built on Radix UI primitives
- **TanStack Query**: Data fetching and state management
- **React Hook Form**: Form handling with validation

#### Key Frontend Components:

- **Pages**: Main application views
- **Components**: Reusable UI elements
  - ChatContainer: Handles message display and interaction
  - UploadModal: Manages prescription image uploads
  - MessageInput: User input interface
  - PrescriptionResult: Displays analyzed prescription data
- **Services**: API communication layer
- **Hooks**: Custom React hooks
- **Lib**: Utility functions

#### Client-Side Flow:

1. User uploads a prescription image or sends a text message
2. Frontend validates and processes input
3. API requests are sent to the backend
4. Responses are rendered in the UI with appropriate loading states

### 2. Backend (Server)

The backend is built with Node.js and Express:

- **Express**: Web framework for routing and middleware
- **OpenAI API**: Integration for AI image analysis and chat
- **Drizzle ORM**: Database interactions (optional)
- **Zod**: Schema validation

#### Key Backend Components:

- **API Routes**: REST endpoints for client communication
- **OpenAI Service**: Handles AI model interactions
- **Storage Interface**: Data persistence layer
- **Medication Validator**: Business logic for validating medications

#### Server-Side Flow:

1. Receive API requests from frontend
2. Validate request data using Zod schemas
3. Process requests through appropriate services
4. Store relevant data via storage interface
5. Return responses to the client

### 3. Data Flow

#### Prescription Analysis Flow:

1. User uploads a prescription image via the UI
2. Image is converted to base64 and sent to the `/api/analyze-prescription` endpoint
3. Backend sends the image to OpenAI's GPT-4o Vision model
4. AI analyzes the image and returns structured text
5. Backend processes the text to extract medication information
6. Medication information is validated against known standards
7. Results are returned to the frontend as structured data
8. Frontend displays the results in a user-friendly format

#### Chat Interaction Flow:

1. User sends a message via the chat interface
2. Message is sent to the `/api/messages` endpoint
3. Backend processes the message and generates an AI response
4. Response is returned to the frontend
5. Frontend displays the response in the chat interface

## Data Model

### Core Entities:

#### User
- id: number
- username: string
- password: string (hashed)
- name: string
- email: string

#### Prescription
- id: number
- userId: number
- imageUrl: string
- analysisResult: JSON
- createdAt: Date

#### Message
- id: number
- prescriptionId: number
- content: string
- role: 'user' | 'assistant'
- createdAt: Date
- metadata: JSON (optional)

#### Feedback
- id: number
- messageId: number
- isAccurate: boolean
- comments: string (optional)
- createdAt: Date

### Schema Design:

The application uses TypeScript interfaces and Zod schemas to define and validate data:

- Types are defined in `shared/schema.ts`
- Schemas are shared between frontend and backend for consistency
- Validation occurs on both client and server sides

## Security Considerations

### Authentication & Authorization

- Session-based authentication
- Secure password storage with bcrypt
- Role-based access control

### Data Security

- HTTPS for all communications
- Environment variables for sensitive data
- No storage of prescription images beyond the analysis session
- Sanitization of user inputs

### API Security

- Rate limiting to prevent abuse
- CORS configuration
- Input validation with Zod

## Performance Optimizations

- Query caching with TanStack Query
- Optimistic UI updates
- Lazy loading of components
- Image compression before processing
- Efficient state management

## Extensibility

The architecture is designed for easy extension:

- Modular component structure
- Abstracted storage interface
- Clear separation of concerns
- Type-safe interfaces between components

## Development Workflow

- TypeScript for type safety
- ESLint for code quality
- Prettier for consistent formatting
- React Query DevTools for debugging queries
- Replit workflow for development environment

## Deployment Architecture

The application can be deployed in various environments:

- Single-server deployment (Express serving frontend)
- Separate frontend and backend deployments
- Containerized deployment with Docker
- Cloud services like Vercel, Netlify, or Heroku