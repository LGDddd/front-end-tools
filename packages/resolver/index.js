const fs = require('node:fs')

const defaultOptions = {
    importElementPlus: true,
    ext: 'mjs',
}

function MyComponentsResolver(options = {}) {
    const mergeOptions = Object.assign(defaultOptions, options)
    return {
        type: 'component',
        resolve: (name) => {
            if (name.startsWith('My')) {
                const partialName = name.slice(2)
                const smallPartialName = partialName.toLowerCase()
                let sideEffects = []
                if (mergeOptions.importElementPlus) {
                    if (mergeOptions.ext === 'mjs') {
                        sideEffects = [
                            '@lgd_org/components/es/style/var.css',
                            `@lgd_org/components/es/my-${smallPartialName}/style/index.mjs`,
                        ]
                    }
                    else {
                        sideEffects = [
                            '@lgd_org/components/lib/style/var.css',
                            `@lgd_org/components/lib/my-${smallPartialName}/style/index.cjs`,
                        ]
                    }
                }
                else {
                    sideEffects = [
                        '@lgd_org/components/es/style/var.css',
                        `@lgd_org/components/es/my-${smallPartialName}/style/index.css`,
                    ]
                }
                return {
                    name: `My${partialName}`,
                    from: '@lgd_org/components',
                    sideEffects,
                }
            }
        },
    }
}

module.exports = {
    MyComponentsResolver,
}
