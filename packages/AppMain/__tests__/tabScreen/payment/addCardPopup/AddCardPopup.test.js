import React from 'react';
import renderer from 'react-test-renderer';
import AddCardPopup from "../../../../src/tabScreen/payment/addCardPopup/AddCardPopup";

test('renders correctly', () => {
    expect(
        renderer.create(<AddCardPopup/>).toJSON()
    ).toMatchSnapshot();
});
