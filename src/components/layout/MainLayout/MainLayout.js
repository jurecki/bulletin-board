import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

class Component extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        {children}
      </div >
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
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
