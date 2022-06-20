import webpack from 'webpack';
import path from 'path';

const config: webpack.Configuration = {
    name: 'netflix-react',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@hooks': path.resolve(__dirname, 'hooks'),
            '@components': path.resolve(__dirname, 'components'),
            '@layouts': path.resolve(__dirname, 'layouts'),
            '@pages': path.resolve(__dirname, 'pages'),
            '@utils': path.resolve(__dirname, 'utils'),
            '@typings': path.resolve(__dirname, 'typings'),
        },
    },
    entry : {
        app: './client'
    }, //입력
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-laoder',
                options: {
                    presets:[
                        [
                            '@babel/preset-env',
                            {
                                target:{browers: ['last 2 chrome version']},
                                
                            },                            
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',                        
                    ],
                    env: {
                        development: {
                            
                        },
                        production: {

                        }
                    },
                },
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [

    ],
    output : {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    }, //출력
}