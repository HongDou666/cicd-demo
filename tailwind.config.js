/* tailwind.config 配置文件 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        cyan: '#9cdbff'
      },
      maxWidth: {
        custom: '60rem'
      },
      spacing: {
        76: '19rem'
      },
      fontSize: {
        xxs: ['26px', { lineHeight: '1rem' }]
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
