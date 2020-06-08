import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getPostById, createActionRemovePost } from '../../../redux/postsRedux';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';

import styles from './Post.module.scss';

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    match: PropTypes.object,
    post: PropTypes.object,
  };

  handlerOnClick = (post) => {
    console.log('post usunięty')
    this.props.removePost(post)
  }

  render() {
    const { className, match, post } = this.props
    const id = match.params.id
    return (
      <div className={clsx(className, styles.root)}>

        <h1>{post.title}</h1>
        <p>Opis: {post.description}</p>
        <p>Data publikacji: {post.dateOfPublication}</p>
        <p>Data aktualiazcji: {post.dateOfUpdate}</p>
        <p>Email: {post.email}</p>
        <p>Status: {post.status}</p>
        <p>Zdjęcie: <img src={`${IMAGES_URL}/${post.file}`} alt={post.title} /> </p>
        <p>Cena: {post.price}</p>
        <p>Telefon: {post.phone} </p>
        <p>Lokazliacji: {post.location}</p>
        <Button component={Link} to={`${process.env.PUBLIC_URL}/post/${id}/edit`} variant="contained">Edytuj</Button>
        <Button component={Link} to={`${process.env.PUBLIC_URL}/`} variant='contained' onClick={this.handlerOnClick.bind(this, post)}>USUŃ</Button>
      </div>)
  }
}

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  removePost: data => dispatch(createActionRemovePost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
