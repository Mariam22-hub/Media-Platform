## Project Overview
This project provides a frontend service for managing media files (images and videos) using Express.js, Mongodb, and Firebase Cloud Storage. Features include file uploads, media retrieval, file deletion, and the ability to toggle 'like' status for each media item.

## Technologies Used
- React.js
- Styled-Components for CSS in JS
- Axios for HTTP requests
- FontAwesome for icons
- Firebase Cloud Storage
- Vite
  
### Installation
1. **Clone the repository:**
   ```bash
   git clone the repository
   navigate to the client/media folder
   npm install
   
2. **Start the vite server:**
To run the program, run script:
```bash
npm run dev
```

## Features
- Upload media files with titles and descriptions.
- View all uploaded media in a grid format.
- Toggle 'like' status of media files.
- Delete media files.
- Responsive design for various screen sizes.

## Components
UploadComponent: Allows users to upload new media files with metadata like titles and descriptions.
MediaComponent: Displays all media items and includes functionality to like and delete each item.
ButtonComponent: A reusable button component styled with Styled-Components and FontAwesome icons.

## Data Flow
1. **User Interaction**: Users interact with the React frontend by uploading files, viewing media, or modifying media status (like/delete).
2. **API Communication**: Actions taken on the frontend trigger HTTP requests to the Express backend.
3. **Media Management**: The backend handles these requests, performing operations like uploading to, fetching from, or deleting from Firebase Cloud Storage, and updating the mongodb.
4. **Response Handling**: The backend sends responses back to the frontend, which then updates the UI accordingly.
