import express from "express";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject, listAll } from "firebase/storage";
import * as firebase from "firebase/app";
import {sendStatusToAllClients} from '../../index';
// import {sendStatusToAllClients} from "../../index";
import { getAllMediaModel,
  deleteMediaModel,
  addMediaModel,
  updateMediaModel, getSingleMediaModel} from "../models/media.models"
import { Media } from "../schemas/media.schema";

  // Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const errorFunction = (result: any, code: number, res: express.Response) => {
    if (result.status === "success") {
      console.log(result)
      res.status(code).json({
            status: "success",
            data: { result }
        });
    } 
    else {
      res.status(400).send(result);
    }
}

export const addFilesController = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        
        const filePrefix = req.file.mimetype.startsWith("video") ? "video_" : "image_";
        const storageRef = ref(storage, `files/${filePrefix}/${req.file.originalname}`);
        const metadata = { contentType: req.file.mimetype };

        // sendStatusToAllClients({ message: "Upload received, processing..."});

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const data = {
            title: req.body.title || req.file.originalname, 
            mediaUrl: downloadURL, 
            liked: false, 
            filename: req.file.originalname,
            filePath: storageRef.fullPath
        };

        const result = await addMediaModel(data);
        
        if (result) {
          console.log("media saved successfully");
          // sendStatusToAllClients({ message: 'New media added', media: data });
          res.json({ status: "success", data: result });
        }

    } 
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Server error');
    }
};


export const deleteFileController = async (req: express.Request, res: express.Response) => {
    try {
        
        const mediaId = req.params.id;
        const media = await getSingleMediaModel(mediaId);
        const filePath =  ref(storage, media.data.filePath);
        
        deleteObject(filePath)
        .then(()=>{
            console.log("File Deleted sucessfully")
            deleteMediaModel(mediaId) 
            return res.status(200).send("File deleted successfully")
        })
        .catch((error: Error) => {
            console.log("Problem occured while deleting media file")
            return res.status(400).send(error.message)
        })

    } 
    catch (error) {
        return res.status(400).send(error)
    }
};

export const getAllMediaController = async (req: express.Request, res: express.Response) => {
  console.log("in get all media")
  try {
    const media = await getAllMediaModel();
    errorFunction(media, 200, res)
  } 
  catch (error: any) {
    console.log(error)
    
    res.status(400).send({
      msg: `Error while getting media: ${error.message}`,
      status: "failure",
    });
  }
};

export const toggleLike = async (req: express.Request, res: express.Response) => {
  try {
    console.log("in controller")
    const mediaId  = req.params.id;
    const media = await getSingleMediaModel(mediaId);
    
    if (!media) { 
      return res.status(404).send({ message: 'Media not found' });
    }
    media.data.liked = !media.data.liked;
    const updatedMedia = await updateMediaModel(media.data, media.data._id);
    res.json({ media: updatedMedia });
  } 
  catch (error: any) {
    res.status(500).send({ message: 'Error toggling like status', error: error.message });
  }
};