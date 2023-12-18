import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'

const entries = [
    'src/index.ts',
]
const umdEntries = [
    'src/index.umd.ts',
]

const plugins = [
    alias({
        entries: [
            { find: /^node:(.+)$/, replacement: '$1' },
        ],
    }),
    resolve({
        preferBuiltins: true,
        mainFields: ['browser'],
    }),
    json(),
    commonjs(),
    esbuild({
        target: 'es2018',
    }),
]

export default [
    ...entries.map(input => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
                format: 'cjs',
            },
        ],
        external: [],
        plugins,
    })),
    ...umdEntries.map(input => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.js'),
                format: 'umd',
                name: 'utils',
            },
        ],
        external: [],
        plugins,
    })),
    ...entries.map(input => ({
        input,
        output: [
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.mts'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
                format: 'esm',
            },
            {
                file: input.replace('src/', 'dist/').replace('.ts', '.d.cts'),
                format: 'cjs',
            },
        ],
        external: [],
        plugins: [
            dts({ respectExternal: true }),
        ],
    })),
]
