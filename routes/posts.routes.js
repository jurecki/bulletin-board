const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' })
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

router.post('/posts', async (req, res) => {
  try {


    const newPost = new Post({ title: 'lalla' });
    await newPost.save(); // ...save new photo in DB
    res.json(newPost);



  } catch (err) {
    console.log('bład po stronie serwera', err)
    res.status(500).json(err);
  }
})
module.exports = router;
