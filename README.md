# Microservice which streams a video file from Azure blob storage

- We need an Azure Cloud Account
- In Azure, create: Storage account > Blob > Container. Upload video file in container
- Create a nodejs express app
- We use createBlobService() method to get blob data
- We run getBlobProperties() method on blobService. It accepts container name, videofile name as parameters.
- We send videofile name using query parameter in http request
- After that, we use getBlobToStream() method to stream the video
- http get request: ```http://localhost:3000/video?path=vid1.mp4```
