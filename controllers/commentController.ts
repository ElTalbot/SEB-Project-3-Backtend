import { Request, Response } from "express";
import Comment from "../models/comments";
import formatValidationError from "../errors/validation";

//getting date and time for post




//Show post
export async function getPost(req: Request, res: Response) {
  const animalId = req.params.animalId;
  console.log(animalId);
  const post = await Comment.find({ animalId: animalId });
  res.send(post);
}


//Add a post
export async function createPost(req: Request, res: Response) {
  try {

let ts = Date.now()
let date_time = new Date(ts);
let date = date_time.getDate();
let month = date_time.getMonth()+ 1;
let year = date_time.getFullYear();
let hours = date_time.getHours();
let minutes = date_time.getMinutes();


    console.log(res.locals.currentUser);
    console.log(req.params.animalId)
    //add the current user to the post
    req.body.user = res.locals.currentUser;
    //add the animalId to the post
    req.body.animalId = req.params.animalId;
    //add the date to the post
    req.body.date = date + "-" + month + "-" + year;
    //add the time to the post
    req.body.time = hours + ":" + minutes;
    console.log("Adding", req.body);
    let comment = await Comment.create(req.body);
    res.send(comment);
    console.log(comment)
  } catch (e) {
    res.status(400).send({
      message: "Not a valid document layout",
      errors: formatValidationError(e),
    });
  }
}

//Update a post
export async function updatePost(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    const update = req.body;
    const userId = res.locals.currentUser._id;

    const postToUpdate = await Comment.findById(postId);
    if (!postToUpdate) {
      return res.status(404).send({ message: "That post was not found" });
    }
    const postUser = postToUpdate?.user;

    console.log("postId: ", postId);
    console.log("Post UserId", postUser);
    console.log("currentUserId: ", userId);

    if (userId.equals(postUser)) {
      const updatePost = await Comment.findByIdAndUpdate(postId, update, {
        new: true,
      });
      res.send(updatePost);
    } else {
      return res
        .status(401)
        .send({ message: "You aren't authorized to update this post" });
    }
  } catch (e) {
    res
      .status(400)
      .send({ message: "There was a problem updating your animal page" });
  }
}

//Delete a post
export async function deletePost(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    const postToDelete = await Comment.findById(postId);
    if (!postToDelete) {
      return res.status(404).send({ message: "That post was not found" });
    }
    const userId = res.locals.currentUser._id;
    const postUser = postToDelete.user;
    console.log("currentUserId: ", userId);
    console.log("Post to delete: ", postToDelete);
    console.log("postlUserId: ", postUser);

    if (userId.equals(postUser)) {
      const deleteAnimal = await Comment.findByIdAndDelete(postId);
      return res.send(deleteAnimal);
    } else {
      return res
        .status(401)
        .send({ message: "You aren't authorized to delete this post" });
    }
  } catch (e) {
    res.status(400).send({ message: "There was a problem deleting this post" });
  }
}
