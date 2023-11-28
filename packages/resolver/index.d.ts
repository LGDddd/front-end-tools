export declare function MyComponentsResolver(): {
    type: 'component' | 'directive'
    resolve: (name: string) => {
        name: string
        from: string
        sideEffects: string[]
    } | undefined
}
