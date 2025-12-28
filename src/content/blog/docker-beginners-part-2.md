---
title: 'Docker for Beginners: Building Custom Images'
description: 'Learn how to create your own Docker images using Dockerfiles and package your applications.'
pubDate: '2025-12-27'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['docker', 'containers', 'dockerfile', 'images']
category: 'Home Lab'
series: 'Docker for Beginners'
part: 2
difficulty: 'beginner'
excerpt: 'Create custom Docker images with Dockerfiles. Learn to package your applications and define container environments.'
featured_image: '../../assets/blog-placeholder-2.jpg'
canonical: 'https://example.com/docker-beginners-part-2'
---

# Docker for Beginners: Building Custom Images

Welcome back to our Docker for Beginners series! In Part 1, we learned the basics of running containers. Now we'll create our own custom Docker images using Dockerfiles.

## What is a Dockerfile?

A Dockerfile is a text file that contains instructions for building a Docker image. It defines the environment, dependencies, and commands needed to run your application.

## Basic Dockerfile Structure

```dockerfile
# Use an official base image
FROM ubuntu:20.04

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Copy application files
COPY . .

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["python3", "app.py"]
```

## Key Dockerfile Instructions

- **FROM**: Specifies the base image
- **WORKDIR**: Sets the working directory
- **RUN**: Executes commands during build
- **COPY/ADD**: Copies files into the image
- **EXPOSE**: Documents which ports the container listens on
- **CMD/ENTRYPOINT**: Specifies the command to run

## Building Your First Image

Create a simple Node.js application:

```javascript
// app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Docker!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
```

Create a package.json:

```json
{
  "name": "docker-demo",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "4.18.2"
  }
}
```

Now create the Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
# Build the image
docker build -t my-node-app .

# Run the container
docker run -p 3000:3000 my-node-app
```

## Best Practices

### Use Multi-Stage Builds

For compiled languages or to reduce image size:

```dockerfile
# Build stage
FROM golang:1.19 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp .

# Runtime stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/myapp .
CMD ["./myapp"]
```

### Optimize Layer Caching

Order your instructions to maximize Docker's layer caching:

```dockerfile
FROM node:18-alpine

# Copy package files first (changes less frequently)
COPY package*.json ./
RUN npm install

# Copy source code (changes more frequently)
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

## Common Patterns

### Development vs Production

Use different Dockerfiles or multi-stage builds for different environments.

### Environment Variables

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

### Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

## What's Next?

You've now learned to create custom Docker images! In future parts of this series, we'll explore:

- Docker Compose for multi-container applications
- Volumes and data persistence
- Networking between containers
- Docker in production environments

Keep experimenting and happy containerizing!