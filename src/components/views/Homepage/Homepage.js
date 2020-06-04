import React from 'react';
import PropTypes from 'prop-types';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAll, reduxActionCreator } from '../../../redux/postsRedux';
import { Post } from '../Post/Post';
import styles from './Homepage.module.scss';

const Component = ({ className, children, posts }) => (
  <div className={clsx(styles.container, styles.root)}>
    {initialState.role === 'user' || initialState.role === 'admin' ?
      <div>
        <Button component={NavLink} to={`${process.env.PUBLIC_URL}/post/add`} variant="contained">DODAJ NOWE OGŁOSZENIE</Button>
        <h2>Lista ogłoszeń:</h2>
        {posts.map(post =>
          <NavLink key={post.id} to={`/post/${post.id}`}>
            <p>{post.title}</p>
          </NavLink>
        )}
      </div> :
      null
    }
  </div >
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
