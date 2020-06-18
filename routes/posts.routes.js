const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find()
      .select('author created title photo')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post) {
      await Post.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' })
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json(err)
  }
})

router.put('/posts/:id', async (req, res) => {
  try {

    const photo = req.files.photo;
    let fileName;
    if (!photo) fileName = null;
    else fileName = photo.path.split('/').slice(-1)[0]; // cut only filename from full path, e.g. C:/test/abc.jpg -> abc.jpg

    const { author, created, updated, status, title, text, price, phone, location } = req.fields

    const post = await Post.findById(req.params.id);
    if (post) {
      post.title = title,
        post.author = author,
        post.created = created,
        post.updated = updated,
        post.status = status,
        post.text = text,
        post.price = price,
        post.photo = fileName,
        post.phone = phone,
        post.location = location,

        await post.save();
      res.json(post)

    } else res.status(404).json({ message: 'Not found...' });

  }
  catch (err) {
    console.log('blad po stronie servera')
    res.status(500).json(err)
  }
})

router.post('/posts', async (req, res) => {
  try {
    console.log('body backend', req.fields)

    const photo = req.files.photo;
    let fileName;
    if (!photo) fileName = null;
    else fileName = photo.path.split('/').slice(-1)[0]; // cut only filename from full path, e.g. C:/test/abc.jpg -> abc.jpg

    const { author, created, updated, status, title, text, price, phone, location } = req.fields

    const newPost = new Post({ author, created, updated, status, title, text, price, phone, location, photo: fileName });
    await newPost.save(); // ...save new photo in DB
    res.json(newPost);

  } catch (err) {
    console.log('bład po stronie serwera', err)
    res.status(500).json(err);
  }
})
module.exports = router;
