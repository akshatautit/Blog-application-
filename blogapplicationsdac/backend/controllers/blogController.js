const Blog = require('../models/blogModel'); // Assuming you have a Blog model

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find(); // Fetch all blogs
    console.log(blogs);
    res.json(blogs);
};

exports.getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id); // Find a blog by ID
    if (!blog) return res.status(404).send('Blog not found');
    res.json(blog);
};

exports.createBlog = async (req, res) => {
const {name, imgUrl,des}= req.body;
console.log(des);
    const newBlog = new Blog({ name, imgUrl, des });
    await newBlog.save(); // Save the new blog
    res.status(201).json(newBlog);
};

exports.updateBlog = async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).send('Blog not found');
    res.json(blog);
};

exports.deleteBlog = async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.send('Blog deleted');
};
