import {
    CONNECT_SOCKET, DISCONNECT_SOCKET, SEND_MESSAGE, webSocketMessageReceived
} from '../actions/socket'

export default (function () {
    let socket = null;
    let connected = false;

    let disconnectSocket = function () {
        connected = false;
        if (socket != null) {
            socket.close()
        }
        socket = null
    };
    let connectSocket = function (action, next) {
        if (socket != null) {
            socket.close()
        }

        socket = new WebSocket("ws://" + action.host + ":" + action.port + "/_mockserver_ui_websocket")
        socket.onmessage = (event) => {
            next(webSocketMessageReceived(
                JSON.parse(event.data)
            ))
        };
        socket.onclose = () => {
            disconnectSocket();
        };
        socket.onopen = () => {
            connected = true;
            if (action.message) {
                socket.send(JSON.stringify(action.message))
            }
        }
    };
    return store => next => action => {
        switch (action.type) {

            case CONNECT_SOCKET:
                connectSocket(action, next);
                break;
            case DISCONNECT_SOCKET:
                disconnectSocket();
                break;
            case SEND_MESSAGE:
                if (connected) {
                    socket.send(JSON.stringify(action.message))
                } else {
                    connectSocket(action, next)
                }
                break;
            default:
                return next(action)
        }
    }

})()