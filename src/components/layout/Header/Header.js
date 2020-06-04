import React from 'react';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { initialState } from '../../../redux/initialState';


const Component = ({ className, children, login }) => (
  <div className={clsx(styles.header, styles.root)}>
    {initialState.role === 'user' || initialState.role === 'admin' ?
      <div>
        <Button variant="contained">MY POST</Button>
        <Button variant="contained">LogOut</Button>
      </div>
      :
      <a className={clsx(styles.loginBtn, styles.loginBtnGoogle)} href='https://www.google.com/'>Login with Google</a>
    }
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  login: PropTypes.bool,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
