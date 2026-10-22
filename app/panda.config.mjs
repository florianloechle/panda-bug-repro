export default {
  designSystem: '@acme/ds',
  include: ['./src/**/*.js'],
  outdir: 'styled-system',
  // Remove this line and the button is styled again. `hash: true` breaks it the same way.
  prefix: 'app'
};
