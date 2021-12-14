import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, show: action.show, error: null };
    }

    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

function Show() {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        dispatch({ type: 'FETCH_SUCCESS', show: results });
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('show: ', show);

  if (isLoading) {
    return <div> You gotta wait!! Data is being loaded. </div>;
  }

  if (error) {
    return <div> There is some error!! {error}</div>;
  }

  return <div>This is Show page</div>;
}

export default Show;
