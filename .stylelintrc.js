module.exports = {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue/scss",
    ],
    overrides: [
        {
            files: ['**/*.{vue,html}'],
            customSyntax: 'postcss-html'
        }
    ],
    rules: {
        indentation: 4,
        'no-duplicate-selectors': null,
    }
}
