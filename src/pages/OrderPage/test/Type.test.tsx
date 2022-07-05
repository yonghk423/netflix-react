import { render, screen } from "@testing-library/react"
import React from 'react';
import Type from '../Type'
test('display product images from server' , async () => {
    render(<Type />)

    const productImages = await screen.findAllByRole("img", {
        name: /product$/i
    });    
    
    const altText = productImages.map((element:any) => element.alt);
    expect(altText).toEqual(["America product", "England product"]);

})
