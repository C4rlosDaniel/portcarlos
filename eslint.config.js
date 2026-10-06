// DECISION: kept scaffold defaults (React 19, react-router-dom v7, Tailwind v4)
// instead of downgrading to React 18 / router v6. The APIs used are identical,
// and the newer versions avoid peer-dependency friction with the toolchain.
import js from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'src/data/github.json', 'scripts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  prettier,
)