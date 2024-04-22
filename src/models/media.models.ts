import { UUID } from "crypto";
import { Media } from "../schemas/media.schema";

export const addMediaModel = async (data: any) => {
  const newMedia = new Media(data);
  const result = await newMedia.save();

  if (result) {
    return { data: result, status: "success" };
  } 
  else {
    return { msg: "Failed to Add Media.", status: "failure" };
  }
};

export const deleteMediaModel = async (_id: string) => {
  const recordToDelete = await Media.findOneAndDelete({ _id: _id });

  if (recordToDelete) {
    await recordToDelete.deleteOne();

    return { msg: "Record deleted successfully.", status: "success" };
  } 
  else {
    return { msg: "Record not found.", status: "failure" };
  }
};

export const getAllMediaModel = async () => {
  const records = await Media.find().sort({ createdAt: -1 });

  if (records) {
    return { data: records, status: "success" };
  } 
  else {
    return { msg: "No Media found.", status: "failure" };
  }
};

export const updateMediaModel = async (data: any, _id: string) => {
  const updatedResult = await Media.findOneAndUpdate({_id:_id}, {$set:{liked:data.liked}}, {new:true});
  if (updatedResult > 0) {
    return { msg: "Record updated successfully.", status: "success" };
  } 
  else {
    return { msg: "Record not found.", status: "failure" };
  }
};

export const getSingleMediaModel = async (id: string) => {
  console.log("in get record")
  // console.log(id)
  const record = await Media.findById(id)
  // console.log(record)
  if (record) {
    return { data: record, status: "success" };
  } 
  else {
    return { msg: "No Media found.", status: "failure" };
  }
};
