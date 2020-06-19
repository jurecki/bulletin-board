import Axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getPostById = ({ posts }) => posts.currentPost || {};

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

    if (posts.data.length === 0 && posts.loading.active === false) {
      dispatch(fetchStarted());
      Axios
        .get(`${API_URL}/posts`)
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
    const { posts } = getState();

    dispatch(fetchStarted());

    Axios
      .get(`${API_URL}/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    console.log(data);

    Axios
      .post(`${API_URL}/posts`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      )
      .then((res) => {
        console.log('res:', res.data);
        dispatch(createActionAddPost(res.data));
      })
      .catch(err => {
        console.log('bład po stronie clienta', err);
        dispatch(fetchError(err.message || true));
      });

  };

};

export const updatePostRequest = (id, data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.put(`${API_URL}/posts/${id}`, data)
      .then((res) => {
        console.log('resDATA', res.data);
        dispatch(createActionEditPost(res.data));
      })
      .catch((err) => {
        console.log('blad po stronie clienta');
        dispatch(fetchError(err.message || true));
      });
  };
};



export const removePostById = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .delete(`${API_URL}/posts/${data}`)
      .then(res => {
        dispatch(createActionRemovePost(data));
      })
      .catch(err => {
        console.log('blad po stronie clienta', err);
        dispatch(fetchError(err.message || true));
      });
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
      if (Array.isArray(action.payload)) {
        return {
          ...statePart,
          loading: {
            active: false,
            error: false,
          },
          data: action.payload,
        };
      } else {
        return {
          ...statePart,
          loading: {
            active: false,
            error: false,
          },
          currentPost: action.payload,
        };
      }

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
        loading: {
          active: false,
          error: false,
        },
      };
    case REMOVE_POST: {
      let posts = statePart.data.filter(post => post._id !== action.payload);
      return {
        ...statePart,
        data: posts,
      };
    }
    case EDIT_POST: {
      console.log('payload', action.payload);
      let posts = statePart.data.map(post => {
        if (post._id === action.payload._id) post = action.payload;
        return post;
      });
      return {
        ...statePart,
        data: posts,
        loading: {
          active: false,
          error: false,
        },
      };
    }

    default:
      return statePart;
  }
};
