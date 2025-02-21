// editor only
module.exports = {
    extends: [
        'react-app',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
    ],
    parserOptions: {
        project: true,
    },
    rules: {
        'radix': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'object-curly-newline': ['error', {consistent: true}],
        'import/prefer-default-export': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'never'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/default-param-last': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/function-component-definition': ['error', {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
        }],
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
    },
};
