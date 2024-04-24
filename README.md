## Project Overview

This Flutter project is a media management application designed to handle media files such as images and videos. Users can upload, view, and manage media content with functionalities like like, delete, and refresh actions. The application interacts with a backend service for media storage and management.

## Key Features

- Upload images and videos from device storage.
- Display media files in a scrollable list with options to like or delete.
- Refresh media list on app resume to ensure data consistency.
- Video playback within the app using a custom video player screen.
- Extensive use of asynchronous operations to handle network requests, file picking, and state management.

## Getting Started

### Installation

**Clone the Repository and run**:
   ```bash
   git clone this repository
   navigate to the app branch
   run: flutter pub get
   run the flutter application: flutter run, to install the apk on your device
```
### Dependencies
List of major libraries used in this project:

dio: For making HTTP requests.
file_picker: To pick files from the device.
video_player: To play video files.
cached_network_image: For efficient image loading and caching.

### Architecture
I have utilized the MVVM architecture throughout this project

### Note:
- It's recommended to download the apk on your devices as the functionality of picking media from the gallery doesnt work on emulators
- The application uses the api using the hosted url
