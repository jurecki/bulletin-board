import { connect } from 'react-redux';
import { fetchPublished } from './redux/postsRedux';
import App from './App';

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

export default connect(null, mapDispatchToProps)(App);
