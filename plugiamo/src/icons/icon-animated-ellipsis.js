import { h } from 'preact'

// adapted from https://loading.io/spinner/ellipsis/-discuss-ellipsis-preloader
const IconAnimatedEllipsis = ({ className, onClick, style }) => (
  <svg
    className={className}
    focusable="false"
    onClick={onClick}
    preserveAspectRatio="xMidYMid"
    role="presentation"
    style={style}
    viewBox="0 0 100 100"
  >
    <circle cx="84" cy="50" r="0">
      <animate
        attributeName="r"
        begin="0s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="10;0;0;0;0"
      />
      <animate
        attributeName="cx"
        begin="0s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="84;84;84;84;84"
      />
    </circle>
    <circle cx="84" cy="50" r="3.616">
      <animate
        attributeName="r"
        begin="-1s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="0;10;10;10;0"
      />
      <animate
        attributeName="cx"
        begin="-1s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="16;16;50;84;84"
      />
    </circle>
    <circle cx="71.706" cy="50" r="10">
      <animate
        attributeName="r"
        begin="-0.5s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="0;10;10;10;0"
      />
      <animate
        attributeName="cx"
        begin="-0.5s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="16;16;50;84;84"
      />
    </circle>
    <circle cx="37.706" cy="50" r="10">
      <animate
        attributeName="r"
        begin="0s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="0;10;10;10;0"
      />
      <animate
        attributeName="cx"
        begin="0s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="16;16;50;84;84"
      />
    </circle>
    <circle cx="16" cy="50" r="6.384">
      <animate
        attributeName="r"
        begin="0s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="0;0;10;10;10"
      />
      <animate
        attributeName="cx"
        begin="0s"
        calcMode="spline"
        dur="2s"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        keyTimes="0;0.25;0.5;0.75;1"
        repeatCount="indefinite"
        values="16;16;16;50;84"
      />
    </circle>
  </svg>
)

export default IconAnimatedEllipsis
