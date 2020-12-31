const Post = require("../models/Post");
const PostObject = require("../objects/Post");

exports.postPost = async (req, res, next) => {
    requestData = new PostObject(req.body.title, req.body.description);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const responseData = await post.save();
        res.json(responseData);
    } catch (err) {
        console.log("error from database");

    }
}

exports.getPosts = async (req, res, next) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (err) {
        console.log("error from database", err);

    }

}
//http://localhost:3000/post?p=t2
exports.getPost = async (req, res, next) => {
    const title = req.query.p;
    console.log("***", req.session.isAuth);
    try {
        const post = await Post.findOne({ title: title });

        Post.updateOne()
        if (post === null) {

            res.json({
                message: "no result has been fetched from database"
            })

        }
        res.json(post);
    } catch (err) {
        console.log("error from database", err);
    }

}

exports.updatePost = async (req, res, next) => {
    const title = req.params.t;
    const updateData = req.body;
    const option = { new: true };

    try {
        const requestedUpdatedPost = await Post.findOne({ title: title });
        const response = await Post.findByIdAndUpdate(requestedUpdatedPost.id, updateData, option);
        res.json(response);

    } catch (err) {
        console.log("error from database", err);

    }
}

exports.deletePost = async (req, res, next) => {

    console.log("^^^^", req.auth);

    if (req.auth) {

        const title = req.params.t;
        console.log("deleting ", title);
        try {
            const resposeDatabase = await Post.findOneAndRemove({ title: title });
            res.json(resposeDatabase);
        } catch (err) {
            console.log("error from database", err);
        }

    } else {
        res.status(404).send("Can not access!!");
    }




}