import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import rollupDelete from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

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
        charset: 'utf8',
    }),
]

export default [
    ...entries.map((input, index) => ({
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
        plugins: [
            ...(index === 0 ? [
                rollupDelete({
                    targets: 'dist/*', // 指定要删除的目标文件夹或文件的路径
                }),
            ] : []),
            ...plugins,
        ],
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
