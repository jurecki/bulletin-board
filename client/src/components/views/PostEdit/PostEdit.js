import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getPostById, updatePostRequest } from '../../../redux/postsRedux';
import SubmitPostForm from '../../features/SubmitPostForm.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from './PostEdit.module.scss';

const Component = ({ className, children, match, post, editPost }) => {
  const id = match.params.id;
  return (
    <div className={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            <h2>Edycja Ogłoszenia nr: {id} </h2>
            <SubmitPostForm postEdit={post} action={editPost} type='edited' />
          </Paper>
        </Grid>
      </Grid>
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
  post: getPostById(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  editPost: (id, data) => dispatch(updatePostRequest(id, data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
