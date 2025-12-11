FROM node:20-alpine

WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install only production dependencies (no lockfile required)
RUN npm install --omit=dev

# Copy the rest of the code
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/index.js"]