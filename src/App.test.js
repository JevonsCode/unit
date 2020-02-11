import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    // const div = document.createElement('div');
    // const container = div.getElementsByClassName("App");
    // expect(container.length).toBe(2)
    const wrapper = mount(<App />);
    // const container = wrapper.find("[data-test='app-container']");
    // expect(wrapper.find('.app').length).toBe(1);
    // expect(wrapper.find(".app").prop("title")).toBe("jest enzyme");
    // expect(wrapper.find("[data-test='app-container']").prop("title")).toBe("jest enzyme");
    // expect(container).toExist();
    // expect(container).toHaveProp("title", "jest enzyme");
    expect(wrapper).toMatchSnapshot();
});
