module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'eol-last': 0,
        'semi': 0,
        'no-multiple-empty-lines': 0,
        'no-trailing-spaces': 0,
        'space-before-function-paren': 0,
        'key-spacing': 0,
        'indent': 0,
        'brace-style': 0,
        'no-unused-vars': 0,
        'spaced-comment': 0,
        'node/no-deprecated-api': 'off',
        'comma-spacing': 0,
        'space-before-blocks': 0,
        'eqeqeq': 0,
        'eslint no-undef': 0,
        'no-useless-escape' : 0,
        'keyword-spacing' : 0,
        'no-tabs':0
    }
}