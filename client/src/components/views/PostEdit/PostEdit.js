import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getPostById, createActionEditPost } from '../../../redux/postsRedux';
import SubmitPostForm from '../../features/SubmitPostForm.js';

import styles from './PostEdit.module.scss';

const Component = ({ className, children, match, post, editPost }) => {
  const id = match.params.id
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Edycja Ogłoszenia nr: {id} </h2>
      <SubmitPostForm postEdit={post} action={editPost} type='edited' />
    </div>
  )
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.object,
  post: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editPost: data => dispatch(createActionEditPost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};