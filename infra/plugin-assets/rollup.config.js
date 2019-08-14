import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  input: 'src/data-gathering/baldessarini.js',
  output: {
    file: 'build/data-gathering/baldessarini.js'
  },
  plugins: [
    babel(babelrc())
  ]
};
