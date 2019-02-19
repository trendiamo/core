export default ({ position }) =>
  `
  @keyframes _frekkls_bubble_roll {
    0%{
       border-radius: 50%;
       max-width: 0;
       height: 0;
       padding: 0;
       animation-timing-function: ease-in;
     }
     50%{
       max-width: 30px;
       height: 30px;
       border-radius: ${position === 'left' ? '50% 50% 50% 1px' : '50% 50% 1px'};
       animation-timing-function: cubic-bezier(0.38, 0.29, 0.49, 1.8);
     }
     55% {
       border-radius: ${position === 'left' ? '90px 90px 90px 1px' : '90px 90px 1px 90px'};
     }
     94% {
       height: 45px;
     }
  }
  @keyframes _frekkls_bubble_unroll {
    0% {
      animation-timing-function: cubic-bezier(0.32, -0.5, 0.93, 0.73);
      border-radius: ${position === 'left' ? '20px 40px 40px 1px' : '40px 20px 1px 40px'};
    }
    70% {
      max-width: 50px;
      height: 15px;
      border-radius: ${position === 'left' ? '50% 50% 50% 1px' : '50% 50% 1px'};
      animation-timing-function: ease-out;
      padding: 0;
      opacity: 1;
    }
    100% {
      border-radius: 50%;
      max-width: 0;
      height: 0;
      padding: 0;
      opacity: 0;
    }
  }
`
