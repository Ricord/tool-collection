/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@headlessui/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
      width: {
        '16': '4rem',  // 收缩时的宽度
        '20': '5rem',  // 添加这一行
        '64': '16rem', // 展开时的宽度
      }
    },
  },
  plugins: [],
}

