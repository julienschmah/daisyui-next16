import type { Config } from 'tailwindcss'

const config: Config & { daisyui?: any } = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: 'all',
  },
}

export default config
