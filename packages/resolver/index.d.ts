export declare function MyComponentsResolver(options?: {
    importElementPlus: boolean
    ext: 'cjs' | 'mjs'
}): {
    type: 'component' | 'directive'
    resolve: (name: string) => {
        name: string
        from: string
        sideEffects: string[]
    } | undefined
}
