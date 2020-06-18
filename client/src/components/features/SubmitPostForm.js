import React from 'react';
import ImageUploader from 'react-images-upload';
import styles from './submitPostForm.module.scss';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

class SubmitPostForm extends React.Component {
  state = {
    post: {
      title: '',
      text: '',
      created: '',
      updated: new Date().toISOString().slice(0, 10),
      author: '',
      status: '',
      photo: null,
      price: '',
      phone: '',
      location: '',
    },

  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.node,
    postEdit: PropTypes.object,
    match: PropTypes.object,
    action: PropTypes.func,
    type: PropTypes.string,
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log('status', e.target.value)
    this.setState({
      post: {
        ...this.state.post,
        [name]: value,
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { post } = this.state;
    const { action, type } = this.props;
    let error = null;

    // if (post.title.length < 10) error = `Tytuł powinien mieć min. 10 znaków`;
    // else if (post.description.length < 20) error = `Opis powinien mieć min. 20 znaków`;
    // else if (!post.email) error = "Musisz dodać poprawny adres email"
    // else if (!post.dateOfPublication) error = 'Musisz podać datę publikacji ogłoszenia'

    if (!error) {

      const formData = new FormData();

      for (let key of ['title', 'text', 'created', 'updated', 'author', 'status', 'price', 'phone', 'location']) {
        formData.append(key, post[key]);
      }

      formData.append('photo', post.photo);
      console.log('photo', post.photo);

      if (type === 'edited') {
        action(this.props.postEdit._id, formData);
      } else action(formData);

      alert(`Your post has been ${type}`);
      this.setState({
        post: {
          title: '',
          text: '',
          created: '',
          updated: new Date().toISOString().slice(0, 10),
          author: '',
          status: '',
          price: '',
          phone: '',
          location: '',
          photo: null,
        },
      });
    }
    else {
      alert(error);
    }
  }

  setPhoto = (files) => {
    const { post } = this.state;
    console.log('image upload', files[0].name);
    this.setState({ post: { ...post, photo: files[0] } });
  }

  componentDidMount() {

    const { postEdit } = this.props;
    console.log('postedit', postEdit);
    if (postEdit) {
      this.setState({
        post: {
          id: postEdit.id,
          title: postEdit.title,
          text: postEdit.text,
          created: postEdit.created,
          updated: new Date().toISOString().slice(0, 10),
          author: postEdit.author,
          status: postEdit.status,
          price: postEdit.price,
          phone: postEdit.phone,
          location: postEdit.location,
          photo: postEdit.photo,
        },
      });
    }

  }


  render() {
    const { post, value } = this.state;
    const { postEdit } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={styles.root}>
        <TextField
          className={styles.textField}
          id="standard-full-width"
          fullWidth
          label="Tytuł ogłoszenia:"
          margin="normal"
          value={post.title}
          onChange={this.handleChange}
          name='title'
        />
        <TextField
          className={styles.textField}
          id="standard-full-width"
          label='Opis produktu:'
          fullWidth
          margin="normal"
          value={post.text}
          onChange={this.handleChange}
          name='text'
        />
        <ImageUploader
          withIcon={true}
          buttonText='Choose image'
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview={true}
          onChange={this.setPhoto}
          singleImage={true}
          className={styles.photo}
        />
        <div>
          <TextField
            className={styles.textField}
            id="standard-full-width"
            label='Adres e-mail'
            margin="normal"
            value={post.author}
            onChange={this.handleChange}
            name='author'
          />
          <TextField
            className={styles.textField}
            id="standard-full-width"
            label='Nr telefonu:'
            margin="normal"
            value={post.phone}
            onChange={this.handleChange}
            name='phone'
          />
          <TextField
            className={styles.textField}
            id="standard-full-width"
            label='Lokalizacja:'
            margin="normal"
            value={this.state.post.location}
            onChange={this.handleChange}
            name='location'
          />
          <TextField
            className={styles.textField}
            id="standard-full-width"
            type="text"
            label='Cena:'
            margin="normal"
            value={post.price}
            onChange={this.handleChange}
            name='price'
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
            }}
          />
        </div>
        <br />
        <div>
          <InputLabel className={styles.selectField} id="demo-simple-select-label">Status:</InputLabel>
          <Select
            className={styles.selectField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={post.status}
            name='status'
            onChange={this.handleChange}
          >
            <MenuItem value='draft'>Szkic</MenuItem>
            <MenuItem value='published'>Opublikowane</MenuItem>
            <MenuItem value='closed'>Zamknięte</MenuItem>
          </Select>
        </div>
        <div>
          <TextField
            className={styles.textField}
            id="date"
            label="Data publikacji:"
            type="date"
            defaultValue="2017-05-24"
            name='created'
            value={post.created}
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button variant='contained' onClick={this.handleSubmit}>{postEdit ? 'Zapisz zmiany' : 'Dodaj'} </Button>
          <Button component={Link} to={`${process.env.PUBLIC_URL}/`} variant="contained">ANULUJ</Button>
        </div>
      </form>

    );

  }
}

export default SubmitPostForm;
