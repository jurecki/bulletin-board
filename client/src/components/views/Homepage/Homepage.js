import React from 'react';
import PropTypes from 'prop-types';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
import styles from './Homepage.module.scss';

const Component = ({ className, children, posts, fetchPublishedPosts }) => (
  <div className={clsx(styles.container, styles.root)}>
    {initialState.role === 'user' || initialState.role === 'admin' ?
      <div>
        <Button component={NavLink} to={`${process.env.PUBLIC_URL}/post/add`} variant="contained">DODAJ NOWE OGŁOSZENIE</Button>
        <h2>Lista ogłoszeń:</h2>
        {console.log('Post', posts)}
        {posts.map(post =>
          <NavLink key={post._id} to={`/post/${post._id}`}>
            <p>{post.title}</p>
          </NavLink>
        ).reverse()}
      </div> :
      null
    }
  </div >
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
