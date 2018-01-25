import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
//import uglify from 'rollup-plugin-uglify';
//import { minify } from 'uglify-es';

export default [
	{
        input: './src/lib/Lib.ts',
        external: [ 'typescript-collections', 'sanctuary-type-classes' ],
        output: [
          { file: pkg.module, format: 'es', sourcemap: true },
          { file: pkg.main, format: 'cjs', sourcemap: true },
        ],
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify( process.env['NODE_ENV'] )
            }),

            typescript({
                useTsconfigDeclarationDir: true
            }),

            //uglify({}, minify)
        ]
	}
];
