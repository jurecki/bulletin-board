import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getPostById = ({ posts }, id) => posts.data.find(post => parseInt(post._id) === parseInt(id));

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

export const ADD_POST = createActionName('ADD_POST');
export const EDIT_POST = createActionName('EDIT_POST');
export const REMOVE_POST = createActionName('REMOVE_POST');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const createActionAddPost = payload => ({ payload, type: ADD_POST });
export const createActionEditPost = payload => ({ payload, type: EDIT_POST });
export const createActionRemovePost = payload => ({ payload, type: REMOVE_POST });
/* thunk creators */

export const fetchPublished = () => {
  return (dispatch, getState) => {
    const { posts } = getState();
    console.log(posts);

    if (posts.data.length === 0 && posts.loading.active === false) {
      dispatch(fetchStarted());
      axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }

  };
};

export const loadPostById = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPost = (data) => {
  return dispatch => {
    dispatch(fetchStarted());

    axios.post(
      `http://localhost:8000/api/posts`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

    dispatch(createActionAddPost(data));

  };

};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST:
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    case REMOVE_POST: {
      let posts = statePart.data.filter(post => post.id !== action.payload.id);
      return {
        ...statePart,
        data: posts,
      };
    }
    case EDIT_POST: {
      let posts = statePart.data.map(post => {
        if (post.id === action.payload.id) post = action.payload;
        return post;
      });
      return {
        ...statePart,
        data: posts,
      };
    }

    default:
      return statePart;
  }
};
