import React from 'react';
import renderer from 'react-test-renderer';
import TrainDiagram from "../../../../src/tabScreen/home/component/shoppingCart/trainDiagram/TrainDiagram";

test('renders correctly', () => {
    expect(
        renderer.create(<TrainDiagram/>).toJSON()
    ).toMatchSnapshot();
});
