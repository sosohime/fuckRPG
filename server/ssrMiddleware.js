import { match, RoutingContext, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server'
import { readAll } from '../common/services/app';
import { routes } from '../common/router';
import appState from '../common/models/initialState/app.initialState'
import createApp from '../common/createApp';

export default function(req, res) {
  match({
    routes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const app = createApp({
        history: createMemoryHistory()
      }, /* isServer */true);
      const html = renderToString(app.start()({ renderProps }));
      res.end(renderFullPage(html));
    } else {
      res.status(404).send('Not found')
    }
  });
}

function renderFullPage(html, initialState = '') {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>董师傅的妖孽人生</title>
      <meta charset="utf-8" />
      <link rel="stylesheet" href="/static/index.css" />
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/static/index.js"></script>
    </body>
    </html>
  `;
}
