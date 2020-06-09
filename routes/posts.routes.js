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

    const { title } = req.fields;
    console.log('tytul otrzymanego posta', title)

    if (title) { // if fields are not empty...   
      const newPost = new Post({ title });
      await newPost.save(); // ...save new photo in DB
      res.json(newPost);

    } else {
      throw new Error('Wrong input!');
    }

  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;
