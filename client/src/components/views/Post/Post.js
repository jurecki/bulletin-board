import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import { connect } from 'react-redux';
import { getPostById, removePostById, loadPostById } from '../../../redux/postsRedux';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';

import styles from './Post.module.scss';

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    match: PropTypes.object,
    post: PropTypes.object,
    removePost: PropTypes.func,
    getPost: PropTypes.func,
  };

  handlerOnClick = (id) => {
    this.props.removePost(id);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { className, match, post } = this.props;
    const id = match.params.id;
    return (
      <div className={clsx(className, styles.root)}>
        <Paper className={styles.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="h5" gutterBottom >
                    <strong>{post.title}</strong>
                  </Typography>
                  <Typography variant="h6" gutterBottom >
                    <strong>Cena: </strong>{post.price} PLN
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Opis:</strong> {post.text}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Data publikacji:</strong> {post.created}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Data aktualizacji:</strong> {post.updated}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {post.author}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Telefon:</strong> {post.phone}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Lokalizacja:</strong> {post.location}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Status:</strong> {post.status}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    <Button component={Link} to={`${process.env.PUBLIC_URL}/post/${id}/edit`} variant="contained">Edytuj</Button>
                    <Button component={Link} to={`${process.env.PUBLIC_URL}/`} variant='contained' onClick={this.handlerOnClick.bind(this, post._id)}>USUŃ</Button>
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
      </div>);
  }
}

const mapStateToProps = (state, props) => ({
  post: getPostById(state),
}

);

const mapDispatchToProps = dispatch => (
  {
    getPost: id => dispatch(loadPostById(id)),
    removePost: id => dispatch(removePostById(id)),
  }
);

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
