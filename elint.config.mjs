import js from '@eslint/js';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: js.configs.recommended.rules,
  },
];
