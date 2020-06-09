import React from 'react';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getAll, addPost } from '../../../redux/postsRedux';
import SubmitPostForm from '../../features/SubmitPostForm';
import styles from './PostAdd.module.scss';

const Component = ({ addPost }) => {
  return (
    <div className={clsx(styles.container, styles.root)}>
      {(initialState.role === 'user' || initialState.role === 'admin') &&
        <div>
          <h2>Wypełnij formularz aby dodać nowe ogłoszenie</h2>
          <SubmitPostForm action={addPost} type='added' />
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(addPost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
