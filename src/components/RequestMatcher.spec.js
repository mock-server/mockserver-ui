import React from 'react';
import {Control, Form} from 'react-redux-form';
import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import configureStore from 'redux-mock-store'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import RequestMatcher from './RequestMatcher';
import thunk from "redux-thunk";
import * as sinon from "sinon";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

const props = {
    store: mockStore(initialState),
    requestMatcher: {},
    requestMatcherUpdate: function() {},
    connectSocket: function() {},
    sendMessage: function() {},
    disconnectSocket: function() {},
};

describe('<RequestMatcher />', () => {
    it('renders Form component', () => {
        sinon.spy(RequestMatcher.prototype, 'componentDidMount');
        const wrapper = shallow(<RequestMatcher {...props} />).dive();
        expect(RequestMatcher.prototype.componentDidMount.calledOnce).to.equal(true);
        expect(wrapper.find(Form)).to.have.length(1);
        expect(wrapper.children().find('div')).to.have.length(3);
    });

    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });
});
