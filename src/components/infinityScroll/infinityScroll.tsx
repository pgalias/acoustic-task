import React, { useEffect, useRef, FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { debounce } from 'lodash';

interface Props {
  fetchNext: () => void;
  loader: React.ReactNode;
  isLoading: boolean;
  hasMore: boolean;
  children: React.ReactNode;
  threshold?: number;
}

const InfinityScroll: FunctionComponent<Props> = (props: Props) => {
  const sentinel = useRef(null);

  const infinityScroll = () => {
    if (!props.hasMore || props.isLoading) {
      return;
    }

    const sentinelRelativePosition =
      sentinel.current.getBoundingClientRect().top - window.innerHeight;

    if (sentinelRelativePosition < props.threshold) {
      props.fetchNext();
    }
  };
  const infinityScrollDebounced = debounce(infinityScroll, 200);

  useEffect(() => {
    window.addEventListener('scroll', infinityScrollDebounced);
  }, []);

  useEffect(() => {
    if (!props.hasMore) {
      return window.removeEventListener('scroll', infinityScrollDebounced);
    }
  }, [props.hasMore]);

  useEffect(() => {
    infinityScroll();
  });

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {React.Children.map(props.children, (child: React.ReactNode) => (
          <Grid item xs={12} md={6} lg={3}>
            {child}
          </Grid>
        ))}
      </Grid>

      {props.isLoading && props.loader}

      <div ref={sentinel} />
    </React.Fragment>
  );
};
InfinityScroll.defaultProps = {
  threshold: 100,
};

export default InfinityScroll;
