import { match, RoutingContext, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server'
import { fetchList } from '../common/services/user';
import { routes } from '../common/router';
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
      // switch (renderProps.location.pathname) {
      //   case '/':
      //     fetchList()
      //       .then(({ err, data }) => {
      //         if (err) {
      //           res.status(500).end(`Uncaught error: ${err}`);
      //           return;
      //         }
      //         const initialState = { user: data };
      //         const app = createApp({
      //           history: createMemoryHistory(),
      //           initialState,
      //         }, /* isServer */true);
      //         const html = renderToString(app.start()({ renderProps }));
      //         res.end(renderFullPage(html, initialState));
      //       });
      //     break;
      //   default:
      //     res.status(500).end(`Uncaught pathname: ${renderProps.location.pathname}`);
      //     break;
      // }
      fetchList()
            .then(({ err, data }) => {
                if (err) {
                    res.status(500).end(`Uncaught error: ${err}`);
                    return;
                }
                const initialState = { user: data };
                const app = createApp({
                    history: createMemoryHistory(),
                    initialState,
                }, /* isServer */true);
                const html = renderToString(app.start()({ renderProps }));
                res.end(renderFullPage(html, initialState));
            });
    } else {
      res.status(404).send('Not found')
    }
  });
}

function renderFullPage(html, initialState) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>董师傅的妖孽人生</title>
  <meta charset="utf-8" />
  <link rel="shortcut icon" href="favicon.ico" >
  <link rel="stylesheet" href="/static/index.css" />
</head>
<body>
  <div id="root">
    <div>
      ${html}
    </div>
  </div>
  <script src="/static/index.js"></script>
</body>
</html>
  `;
}
