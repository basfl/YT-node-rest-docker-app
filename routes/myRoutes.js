const express = require("express");
const postController = require("../controllers/post");
const auth=require("../middleware/auth");
const router = express.Router();


router.get("/", (req, res, next) => {
    res.send("we are on home");
})

router.get("/post", postController.getPost);

router.get("/all", postController.getPosts);

router.post("/post", postController.postPost);

router.patch("/post/:t",postController.updatePost);

router.delete("/post/:t",auth,postController.deletePost);

module.exports = router;