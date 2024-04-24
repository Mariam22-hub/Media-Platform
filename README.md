# minly

## Project Overview
This project provides a backend service for managing media files (images and videos) using Express.js, Mongodb, and Firebase Cloud Storage. Features include file uploads, media retrieval, file deletion, and the ability to toggle 'like' status for each media item.

## Technologies Used
- Node.js
- Express.js
- Firebase Cloud Storage
- Multer for handling multipart/form-data
- Mongodb

### Installation
1. **Clone the repository:**
   ```bash
   git clone the repository
   open the main folder, where the src folder is included
   npm install 

2. **Start the server:**
The server is hosted on render with the url
```bash
https://minly-task-jc4q.onrender.com
```
However, to start the local server, write
```bash
npm run start
```

3. **APIs Endpoints:**
```bash
BaseURL (server): https://minly-task-jc4q.onrender.com
BaseURL (local): http://localhost:3001 
```
POST -> /upload: Upload a media file. Requires a multipart/form-data request with a file field.
GET -> /: Retrieve all media.
DELETE -> /delete/:id: Delete a media item by its ID.
PUT -> /toggle/:id: Toggle the like status of a media item.

5. **Architecture:**
This project is utilizing the MVC architecture, where the controller communicates with the model to do database operations.
The view (frontend) communicates with the controller, via urls, to fetch data and such
The routers are responsible for the navigation of endpoints

### Additional Information
- **Server**: According to the Render website, there might be a delay for free instance users, this delay can 50 seconds or more, especially after idleness


