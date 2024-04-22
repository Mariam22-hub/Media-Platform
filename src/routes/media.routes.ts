import multer from "multer";
import express from "express";
const router = express.Router();
// import { Router } from "express";
import * as controllers from "../controllers/media.controllers"


// Setting up multer as a middleware to grab media uploads
const upload = multer({ 
    limits: { fileSize: 10000 * 1024 * 1024 },
});

router.post("/upload", upload.single("file"), controllers.addFilesController);
router.delete("/delete/:id", controllers.deleteFileController)
router.get("/", controllers.getAllMediaController)
router.put("/toggle/:id", controllers.toggleLike)
export default router;