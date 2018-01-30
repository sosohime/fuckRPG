import * as rpger from '../services/app';
import * as user from '../services/user';
import { setAccessToken } from '../utils/system';
import initialState from './initialState/app.initialState';
import * as calendar from '../services/calendar';
import * as bookUpdate from '../services/bookUpdate';

export default {
    namespace: 'app',
    state: initialState,
    subscriptions: {
        setup({ dispatch, history }) {
            // return history.listen(({ pathname, query }) => {
            // })
        }
    },
    reducers: {
        loadAllCalendarSuccess(state, { payload }) {
            return { ...state,
                dongshifu: payload.data.list
            }
        },
        changeLoginModalVisible(state, { payload }) {
            let {
                showLoginModal
            } = payload
            return { ...state,
                showLoginModal
            }
        },
        loginSuccess(state, { payload }) {
            let accessToken = payload.data.data;
            setAccessToken(accessToken);
            return { ...state,
                accessToken,
                showLoginModal: false
            }
        },
        getBookUpdateSuccess(state, { payload }) {
            let bookUpdateDate = new Date(payload.data);
            return { ...state, bookUpdateDate }
        },
        loginError(state, { payload }) {
            return payload
        }
    },
    effects: {
        * loadAllCalendar(action, { call, put }) {
            const result = yield call(calendar.getList);
            yield put({
                type: 'loadAllCalendarSuccess',
                payload: result.data
            })
        },
        * loadBookUpdate(action, { call, put }){
            const result = yield call(bookUpdate.get);
            yield put({
                type: 'getBookUpdateSuccess',
                payload: result.data
            })
        },
        * login(action, { call, put }) {
            let params = action.payload;
            const { data } = yield call(user.login, params)
            if (data.result == 'success') {
                yield put({
                    type: 'loginSuccess',
                    payload: data
                })
            } else {
                yield put({
                    type: 'loginError',
                    payload: data
                })
            }
        }
    },
}