import React from 'react';
import PropTypes from 'prop-types';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import ImageUploader from 'react-images-upload';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {
  state = {
    post: {
      title: '',
      description: '',
      dateOfPublication: '',
      dateOfUpdate: '',
      email: '',
      status: 'draft',
      photo: '',
      price: '',
      phone: '',
      location: '',
      file: null,
    },
    error: null,
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    addPost: PropTypes.func,
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      post: {
        ...this.state.post,
        [name]: value,
      },
    });
  }

  handleSubmit = (e) => {
    const { post } = this.state;
    const { addPost } = this.props;
    e.preventDefault();

    addPost(post);

  }

  setPhoto = (files) => {
    const { post } = this.state;

    if (files) this.setState({ post: { ...post, file: files[0] } });
    else this.setState({ post: { ...post, file: null } });
  }

  render() {
    return (
      <div className={clsx(styles.container, styles.root)}>
        {initialState.role === 'user' || initialState.role === 'admin' ?
          <div>
            <h2>Wypełnij formularz aby dodać nowe ogłoszenie</h2>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='title'> Tytuł ogłoszenia:
                <input id='title' type='text' name='title' value={this.state.post.title} onChange={this.handleChange} />
              </label>
              <label htmlFor='description'>Opis produktu:
                <textarea id='description' cols={40} rows={5} name='description' value={this.state.post.description} onChange={this.handleChange} />
              </label>
              <br />
              <label>Dodaj zdjęcie
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
              </label>

              <label htmlFor='price'>Cena:
                <input id='price' type='text' name='price' value={this.state.post.price} onChange={this.handleChange} />
              </label>
              <label htmlFor='email'> Adres e-mail:
                <input id='email' type='email' name='email' value={this.state.post.email} onChange={this.handleChange} />
              </label>
              <label htmlFor='phone'> Nr telefonu:
                <input id='phone' type='text' name='phone' value={this.state.post.phone} onChange={this.handleChange} />
              </label>
              <label htmlFor='location'> Lokalizacja:
                <input id='location' type='text' name='location' value={this.state.post.location} onChange={this.handleChange} />
              </label>
              <label htmlFor='status'>Status:
                <select id='status' name='status' value={this.state.value} onChange={this.handleChange} >
                  <option value='draft'>Szkic</option>
                  <option value='published'>Opublikowane</option>
                  <option value='closed'>Zamknięte</option>
                </select>
              </label>
              <br />
              <label htmlFor='dateOfPublication'> Data publikacji:
                <input type='date' name='dateOfPublication' value={this.state.post.dateOfPublication} onChange={this.handleChange} />
              </label>
              <button>Dodaj</button>
            </form>
          </div>
          :
          null
        }

      </div>

    );
  }
}

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
