import React from 'react';
import PropTypes from 'prop-types';
import { initialState } from '../../../redux/initialState';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ContainerUI from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
import styles from './Homepage.module.scss';
import { IMAGES_URL } from '../../../config';

const Component = ({ className, children, posts, fetchPublishedPosts }) => (
  <ContainerUI>
    <div className={clsx(styles.container, styles.root)}>
      {fetchPublishedPosts()}
      {initialState.role === 'user' || initialState.role === 'admin' ?
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button component={NavLink} to={`${process.env.PUBLIC_URL}/post/add`} variant="contained">DODAJ NOWE OGŁOSZENIE</Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            {posts.map(post =>
              <NavLink key={post._id} to={`/post/${post._id}`}>
                <Paper className={styles.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="h5">
                            <strong> {post.title}</strong>
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Autor ogłoszenia: {post.author}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Data publikacji: {post.created.slice(0, 10)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <ButtonBase className={styles.image}>
                        <img className={styles.img} src={`${IMAGES_URL}/${post.photo}`} alt={post.title} />
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Paper>
              </NavLink>
            ).reverse()}
          </Grid>
        </Grid>
        :
        null
      }
    </div >

  </ContainerUI>
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
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
