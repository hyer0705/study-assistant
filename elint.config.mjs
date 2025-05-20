import js from '@eslint/js'

export default [
    {
      files: ['**/*.{js,jsx}'],
      rules: js.configs.recommended.rules
    }
  ]