import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve'
import typescript from "@rollup/plugin-typescript"
import pkg from './package.json'

const plugins = [
    svelte({
        preprocess: require('./svelte.config').preprocess,
        compilerOptions: {
            customElement: true,
            dev: false
        }
    }),
    typescript({sourceMap: true}),
    resolve({browser: true})
]

export default ['es', 'umd'].map(format=> {
    const UMD = format === 'umd'
    return {
        input: 'src/index.ts',
        output: {
            format: format,
            file: UMD? pkg.main: pkg.module,
            name: UMD? pkg.name: undefined
        },
        plugins
    }
})

