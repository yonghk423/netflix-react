import webpack from 'webpack';
import 'webpack-dev-server'; //개발용 서버
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'; 
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'; //hot-reloading
const isDevelopment = process.env.NODE_ENV !== 'production';
import dotenv from "dotenv";
dotenv.config();
// import HtmlWebpackPlugin from "html-webpack-plugin";
// console.log(process.env);

const config: webpack.Configuration = {
    name: 'netflix-react',
    mode: isDevelopment ? 'development' : 'production',
    devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
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
                test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',            
          ],
        env: {
            development: {
            plugins: [require.resolve('react-refresh/babel')],
                },    
            },
        },        
        exclude: path.join(__dirname, 'node_modules'),
            
    },
    {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
    },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),        
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        // new HtmlWebpackPlugin()   
    ],
    output : {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    }, //출력
    devServer: {
        historyApiFallback: true, // react router
        port: 8080,
        static: { directory: path.resolve(__dirname) }
    }
}

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
//config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
//config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;