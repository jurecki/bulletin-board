import { connect } from 'react-redux';
import { createActionAddPost } from '../../../redux/postsRedux';
import PostAdd from './PostAdd';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(createActionAddPost({ data })),
});

export default connect(null, mapDispatchToProps)(PostAdd);
