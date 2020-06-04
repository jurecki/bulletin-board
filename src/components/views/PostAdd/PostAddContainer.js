import { connect } from 'react-redux';
import { addPost } from '../../../redux/postsRedux';
import PostAdd from './PostAdd';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addPost: (data) => dispatch(addPost(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd);
