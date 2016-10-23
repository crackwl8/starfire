import React, { Component } from 'react';
import { Row, Col, Breadcrumb } from 'antd';

import './styles/index.less';

export class App extends Component {
  static propTypes = {
    prefixCls: React.PropTypes.string,
    children: React.PropTypes.any,
    location: React.PropTypes.any,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static defaultProps = {
    prefixCls: 'test',
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  state = {
    currentKey: this.props.location.pathname,
  }

  render() {
    const { prefixCls, children, ...props } = this.props;
    return (
      <div className={`${prefixCls}`}>
        <nav className={`${prefixCls}-nav`}>
          <Breadcrumb {...props} separator="/" />
        </nav>
        <h1>welcome, susie</h1>
        <div className={`${prefixCls}-container`}>
          {children}
        </div>
      </div>
    );
  }
}
