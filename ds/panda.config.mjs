export default {
  presets: ['@pandacss/preset-base'],
  include: ['./src/**/*.js'],
  outdir: 'styled-system',
  preflight: false,
  theme: {
    extend: {
      recipes: {
        button: {
          className: 'button',
          base: { display: 'inline-flex', paddingInline: '16px', background: 'blue', color: 'white' },
          variants: { size: { lg: { height: '48px' } } },
          defaultVariants: { size: 'lg' }
        }
      }
    }
  }
};
