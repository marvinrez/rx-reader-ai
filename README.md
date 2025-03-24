# RX Reader AI

![RX Reader AI Logo](./client/public/logo.png)

## Overview

RX Reader AI is an innovative mobile application that transforms prescription management through advanced image recognition and intelligent medical insights. The application leverages cutting-edge AI to analyze and interpret handwritten medical prescriptions, providing users with clear, accessible information about their medications.

## Features

- **Prescription Image Analysis**: Upload or capture prescription images directly through the application.
- **AI-Powered Recognition**: Advanced GPT-4o Vision model interprets handwritten prescriptions with high accuracy.
- **Medication Information**: Get detailed information about medications, dosages, and instructions.
- **Dosage Validation**: Automatic validation of medication dosages against medical standards.
- **User-Friendly Interface**: Intuitive design with responsive mobile-first approach.
- **Security Focused**: End-to-end data encryption with no persistent storage of sensitive medical information.

## Tech Stack

- **Frontend**: React with Tailwind CSS and Shadcn UI components
- **Backend**: Node.js with Express
- **AI Integration**: OpenAI GPT-4o with vision capabilities
- **Database**: In-memory storage (can be extended to PostgreSQL)
- **Authentication**: Session-based authentication

## Project Structure

```
├── client                  # Frontend React application
│   ├── public              # Static assets
│   └── src                 # React source code
│       ├── components      # UI components
│       ├── hooks           # Custom React hooks
│       ├── lib             # Utility functions
│       ├── pages           # Application pages
│       ├── services        # API service functions
│       └── styles          # CSS and styling
├── server                  # Backend Node.js/Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── openai.ts           # OpenAI integration
│   ├── storage.ts          # Data storage interface
│   └── medication-validator.ts # Medication validation logic
├── shared                  # Shared TypeScript types and schemas
└── docs                    # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rx-reader-ai.git
   cd rx-reader-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Usage

1. Open the application on your mobile device or desktop
2. Click on the attachment icon to upload a prescription image
3. Choose to take a photo or select from your gallery
4. The AI will analyze the prescription and display the results
5. Review the medication details, dosages, and any warnings
6. Use the chat feature to ask questions about your prescription

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration: [RX Reader AI on Behance](https://www.behance.net/gallery/184143913/RX-Reader-AI-(Mobile-App))
- Marcos Rezende for the original design concept
- OpenAI for the GPT-4o Vision model

## Contact

For any inquiries, please reach out at youremail@example.com

---

<p align="center">Made with ❤️ for better healthcare</p>