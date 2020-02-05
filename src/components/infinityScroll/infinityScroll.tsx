import React from 'react';
import { Grid } from '@material-ui/core';
import { debounce } from 'lodash';
import Loader from '../shared/loader';

interface Props {
  next: () => void;
  isLoading: boolean;
  hasMore: boolean;
  children: React.ReactNode;
  threshold?: number;
}

class InfinityScroll extends React.Component<Props, {}> {
  public static defaultProps: Pick<Props, 'threshold'> = {
    threshold: 100,
  };

  private sentinel: HTMLDivElement;
  private scrollHandler: () => void;

  componentDidMount(): void {
    this.scrollHandler = debounce(this.onScroll, 200);

    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount(): void {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentDidUpdate(): void {
    if (!this.props.hasMore) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    this.onScroll();
  }

  onScroll = () => {
    if (!this.props.hasMore || this.props.isLoading) {
      return;
    }

    const sentinelRelativePosition =
      this.sentinel.getBoundingClientRect().top - window.innerHeight;

    if (sentinelRelativePosition < this.props.threshold) {
      this.props.next();
    }
  };

  render = () => {
    const sentinel = <div ref={i => (this.sentinel = i)} />;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {React.Children.map(this.props.children, (child: React.ReactNode) => (
            <Grid item xs={12} md={6} lg={4} style={{ margin: '1.5rem 0' }}>
              {child}
            </Grid>
          ))}
        </Grid>

        {this.props.isLoading && <Loader />}

        {sentinel}
      </React.Fragment>
    );
  };
}

export default InfinityScroll;
