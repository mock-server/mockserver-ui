import entities from './entities';
import expect from 'expect'
import {MESSAGE_RECEIVED} from "../actions";

describe('async actions', () => {

    it('should add entities to existing', () => {
        // given
        let state = {
            activeExpectations: ["active_ex_one"],
            recordedExpectations: ["recorded_ex_one"],
            recordedRequests: ["recorded_req_one"],
            logMessages: ["log_one"]
        };
        let action = {
            type: MESSAGE_RECEIVED,
            entities: {
                activeExpectations: ["active_ex_two"],
                recordedExpectations: ["recorded_ex_two"],
                recordedRequests: ["recorded_req_two"],
                logMessages: ["log_two"]
            }
        };

        // when
        let reducedState = entities(state, action);

        // then
        expect(reducedState).toEqual({
            activeExpectations: ["active_ex_two"],
            recordedExpectations: ["recorded_ex_two"],
            recordedRequests: ["recorded_req_two"],
            logMessages: ["log_two"]
        });
    });

    it('should add entities to empty state', () => {
        // given
        let action = {
            type: MESSAGE_RECEIVED,
            entities: {
                activeExpectations: ["active_ex_two"],
                recordedExpectations: ["recorded_ex_two"],
                recordedRequests: ["recorded_req_two"],
                logMessages: ["log_two"]
            }
        };

        // when
        let reducedState = entities(undefined, action);

        // then
        expect(reducedState).toEqual({
            activeExpectations: ["active_ex_two"],
            recordedExpectations: ["recorded_ex_two"],
            recordedRequests: ["recorded_req_two"],
            logMessages: ["log_two"]
        });
    });

    it('should not add entities if wrong type', () => {
        // given
        let action = {
            type: "ANOTHER_TYPE",
            entities: {
                activeExpectations: ["active_ex_two"],
                recordedExpectations: ["recorded_ex_two"],
                recordedRequests: ["recorded_req_two"],
                logMessages: ["log_two"]
            }
        };

        // when
        let reducedState = entities(undefined, action);

        // then
        expect(reducedState).toEqual({
            activeExpectations: [],
            recordedExpectations: [],
            recordedRequests: [],
            logMessages: []
        });
    });

    it('should not add entities if no type', () => {
        // given
        let action = {
            entities: {
                activeExpectations: ["active_ex_two"],
                recordedExpectations: ["recorded_ex_two"],
                recordedRequests: ["recorded_req_two"],
                logMessages: ["log_two"]
            }
        };

        // when
        let reducedState = entities(undefined, action);

        // then
        expect(reducedState).toEqual({
            activeExpectations: [],
            recordedExpectations: [],
            recordedRequests: [],
            logMessages: []
        });
    });

    it('should not add entities if no entites', () => {
        // given
        let action = {
            type: MESSAGE_RECEIVED
        };

        // when
        let reducedState = entities(undefined, action);

        // then
        expect(reducedState).toEqual({
            activeExpectations: [],
            recordedExpectations: [],
            recordedRequests: [],
            logMessages: []
        });
    });
});