import React from 'react';
import { useLoading, BallTriangle } from '@agney/react-loading';

const LoadingContent = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="50" style={{ marginTop: '250px' }} />
  });
  return <section {...containerProps}>{indicatorEl}</section>;
};

export default LoadingContent;
