import path from 'path';
import compression from 'compression';
import express from 'express';
import webpack from 'webpack';
import proxy from 'http-proxy-middleware';
import bodyParser from 'body-parser';
import config from '../webpack.config.babel';

const app = express();

app.use(compression());
if (process.env.NODE_ENV !== 'production') {
  // webpack compile
  const compiler = webpack(config);
  const options = {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {colors: true},
  };
  app.use(require('webpack-dev-middleware')(compiler, options));
  app.use(require('webpack-hot-middleware')(compiler));

  // mock
  app.use(require('./mockMiddleware'));
} else {
  app.use('/static/', express.static(path.join(__dirname, '..', 'dist')));
}

// proxy
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', proxy({
  target: 'http://dong-manager.yulaiz.com',
  pathRewrite: {
    '^/api':'' //remove /api
  },
  changeOrigin: true
}))

app.use(require('./ssrMiddleware'));
app.disable('x-powered-by');

const server = app.listen(2234, () => {
  const { port } = server.address();
  console.info(`Listened at http://localhost:${port}`);
});
