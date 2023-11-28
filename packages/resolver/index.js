function MyComponentsResolver() {
    return {
        type: 'component',
        resolve: (name) => {
            if (name.startsWith('My')) {
                const partialName = name.slice(2)
                return {
                    name: `My${partialName}`,
                    from: '@lgd_org/components',
                    sideEffects: [
                        '@lgd_org/components/es/style/var.css',
                        `@lgd_org/components/es/my-${partialName}/style/index.css`,
                    ],
                }
            }
        },
    }
}

module.exports = {
    MyComponentsResolver,
}
