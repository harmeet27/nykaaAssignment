import React, { Component } from "react";

import './ScrollToTop.css';

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    let scrollComponent = this;
    document.addEventListener("scroll", function(e) {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
        this.setState({
          isVisible: true
        });
      } else {
        this.setState({
          isVisible: false
        });
      }
  }

  scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
  }

  render() {
    const { isVisible } = this.state;
    return (
      <div className="scrollToTop">
        {isVisible && (
          <button onClick={() => this.scrollToTop()} className="button">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              height="38.735"
              width="33.749"
            >
              <g transform="translate(-18.121 -3.364)">
                <rect
                  ry="4.928"
                  y="3.364"
                  x="18.121"
                  height="38.735"
                  width="33.749"
                  fill="#fff"
                />
                <g transform="translate(-.48 2.134)">
                  <rect
                    ry="4.928"
                    y="1.229"
                    x="18.601"
                    height="38.735"
                    width="33.749"
                    fill="url(#b)"
                  />
                  <g fill="#000">
                    <path d="M22.435 17.62l4.684 4.685 5.044-5.044v19.352h6.625V17.26l5.044 5.044 4.683-4.684-13.04-13.04z" />
                    <path d="M22.435 17.62l4.684 4.685 5.044-5.044v19.352h6.625V17.26l5.044 5.044 4.683-4.684-13.04-13.04z" />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>
    );
  }
}