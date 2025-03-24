# RX Reader AI Installation Guide

This guide provides detailed instructions for setting up the RX Reader AI application in different environments.

## Prerequisites

Before beginning the installation, ensure you have the following:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher) or **yarn** (v1.22 or higher)
- An **OpenAI API key** with access to GPT-4o Vision model
- Git (for cloning the repository)

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rx-reader-ai.git
cd rx-reader-ai
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
# OpenAI API configuration
OPENAI_API_KEY=your_openai_api_key

# Server configuration
PORT=5000
NODE_ENV=development

# Optional: For PostgreSQL database (if needed)
# DATABASE_URL=postgresql://username:password@localhost:5432/rx_reader
```

### 4. Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

This will start both the frontend and backend servers concurrently. The application will be available at `http://localhost:5000`.

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

This will create optimized production builds for both the frontend and backend.

### 2. Start Production Server

```bash
npm start
```

### 3. Deployment Platforms

#### Deploying on Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy using the Vercel dashboard or CLI

#### Deploying on Heroku

1. Create a new Heroku application
2. Add the following buildpacks:
   - heroku/nodejs
3. Configure environment variables in the Heroku dashboard
4. Deploy using Heroku CLI or GitHub integration

#### Deploying with Docker

A Dockerfile is included in the repository for containerized deployment:

1. Build the Docker image:
```bash
docker build -t rx-reader-ai .
```

2. Run the container:
```bash
docker run -p 5000:5000 --env-file .env rx-reader-ai
```

## Troubleshooting

### Common Issues

1. **OpenAI API errors**:
   - Ensure your API key is valid and has sufficient quota
   - Check that you have access to the GPT-4o Vision model

2. **Node.js version issues**:
   - Use nvm (Node Version Manager) to install the correct Node.js version:
   ```bash
   nvm install 18
   nvm use 18
   ```

3. **Port conflicts**:
   - If port 5000 is already in use, change the PORT environment variable

4. **Build errors**:
   - Clear the cache and node_modules:
   ```bash
   rm -rf node_modules
   npm cache clean --force
   npm install
   ```

## Advanced Configuration

### Custom Middleware

To add custom middleware, edit the `server/index.ts` file.

### Database Integration

By default, the application uses in-memory storage. To integrate with a PostgreSQL database:

1. Uncomment the database connection code in `server/index.ts`
2. Configure the `DATABASE_URL` in your `.env` file
3. Run database migrations:
```bash
npm run migrate
```

## Security Considerations

- Keep your `.env` file secure and never commit it to version control
- Regularly rotate your API keys
- Set appropriate CORS headers for production environments
- Consider implementing rate limiting for API endpoints

## Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## Support

If you encounter any issues during installation, please:

1. Check the troubleshooting section above
2. Search for similar issues in the GitHub repository
3. Open a new issue with detailed information about your problem
4. Contact the maintainers at [support_email@example.com]