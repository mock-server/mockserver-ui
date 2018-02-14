import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as SocketActions from '../actions';
import fetchMock from 'fetch-mock';
import expect from 'expect'
import {CONNECT_SOCKET, SEND_MESSAGE} from "./index";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();

        // fetchMock
        //     .getOnce('/todos', { body: { todos: ['do something'] }, headers: { 'content-type': 'application/json' } });
    });

    it('should create REQUEST_MATCHER_UPDATE', () => {
        // given
        let requestMatcher = {};

        const expectedActions = [
            {type: SocketActions.REQUEST_MATCHER_UPDATE, requestMatcher}
        ];
        const store = mockStore({requestMatcher: {}});

        // when
        store.dispatch(SocketActions.requestMatcherUpdate(requestMatcher));

        // then
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create CONNECT_SOCKET', () => {
        // given
        let host = "random.host";
        let port = "666";
        let contextPath = "";

        const expectedActions = [
            {type: CONNECT_SOCKET, host, port}
        ];
        const store = mockStore({requestMatcher: {}});

        // when
        store.dispatch(SocketActions.connectSocket(host, port, contextPath));

        // then
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create SEND_MESSAGE', () => {
        // given
        let message = "some message";
        let host = "random.host";
        let port = "666";

        const expectedActions = [
            {type: SEND_MESSAGE, message, host, port}
        ];
        const store = mockStore({requestMatcher: {}});

        // when
        store.dispatch(SocketActions.sendMessage(message, host, port));

        // then
        expect(store.getActions()).toEqual(expectedActions);
    });
});