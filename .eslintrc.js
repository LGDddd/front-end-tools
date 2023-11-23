module.exports = {
    extends: ['@antfu'],
    rules: {
        // eslint 空格处理
        'indent': ['error', 4],
        '@stylistic/ts/indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'jsonc/indent': ['error', 4],
        // 正常语法
        'curly': 'off',
        // vue
        'vue/block-order': 'off',
        // antfu
        'antfu/top-level-function': 'off',
    },
}
