import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

function Show() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setShow(results);
        setIsLoading(false);
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
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
