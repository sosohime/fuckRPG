import React from 'react';
import dva from 'dva';
import {
    RouterContext
} from 'dva/router';
import router from './router';
import all from './models/app';

export default function createApp(opts, isServer) {
    const app = dva(opts);
    app.model(all);
    if (isServer) {
        app.router(({
            history,
            renderProps
        }) => {
            return <RouterContext { ...renderProps
            }
            />;
        });
    } else {
        app.router(router);
    }
    return app;
}