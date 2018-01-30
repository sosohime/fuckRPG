import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/App';

const cached = {};

function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

export const routes = (
    <div>
        <Route path="/" component={App} />
        <Route path="/*" component={App} />
    </div>
);

export default function({ history, app }) {
    return (
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="/*" component={App} />
        </Router>
    );
}


// function RouterConfig({history, app}) {
//     const routes = [{
//         path: '/',
//         getIndexRoute(location, cb) {
//             require.ensure([], (require) => {
//                 registerModel(app, require('./models/app'));
//                 cb(null, {
//                     component: require('./routes/App')
//                 })
//             })
//         }
//     },{
//         path: '/*',
//         getIndexRoute(location, cb) {
//             require.ensure([], (require) => {
//                 registerModel(app, require('./models/app'));
//                 cb(null, {
//                     component: require('./routes/App')
//                 })
//             })
//         }
//     }]

//     return <Router history = {history} routes = {routes} />
// }


// export default RouterConfig;