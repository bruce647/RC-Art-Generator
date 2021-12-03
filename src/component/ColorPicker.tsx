import React, { Component } from 'react';
import ColorPicker from "react-pick-color";
import { Button } from 'antd';
import { ColorSquare, SquareContainer } from './style'

interface MyProps {
    getColorSet:any
}

interface MyState {
    color: string,
    setColor: any,
    size: any,
    counter: number,
    colorSet: any,
    hexColorSet: any,
}

export default class ColorSelecter extends Component<MyProps, MyState>{
    constructor(props: any) {
        super(props)
        this.state = {
            color: "#fff", //initial color
            setColor: "#ffffff", //target color
            colorSet: [], //RGB color elements e.g. [[123,123,123]]
            hexColorSet: ['#7F7C82', '#7F7C82', '#7F7C82'],
            size: 'large',
            counter: 0
        }
        this.hexToRGB = this.hexToRGB.bind(this)
        this.handlePickColorBtn = this.handlePickColorBtn.bind(this)
    }
    render() {
        return (
            <>
                <ColorPicker color={this.state.color} onChange={(color) => this.setState({
                    setColor: color.hex
                })} />
                <SquareContainer>
                    <ColorSquare style={{ background: `${this.state.hexColorSet[0]}` }} />
                    <ColorSquare style={{ background: `${this.state.hexColorSet[1]}` }} />
                    <ColorSquare style={{ background: `${this.state.hexColorSet[2]}` }} />
                </SquareContainer>
                <Button size={this.state.size} onClick={this.handlePickColorBtn}>Pick Color!</Button>
            </>
        )
    }
    //convert hex color to RGB helper
    hexToRGB(hex: string, alpha?: string) {

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return [r, g, b, alpha];
        }

        return [r, g, b];
    }
    //color pick function
    handlePickColorBtn() {
        if (this.state.counter < 3) {
            let newHexColorSet = this.state.hexColorSet;
            newHexColorSet.splice(this.state.counter, 1, this.state.setColor);//store the color to hexColorSet
            let newColorSet = this.state.colorSet;
            newColorSet.push(this.hexToRGB(this.state.setColor));//store the color to RGB colorSet
            this.setState({
                colorSet: newColorSet,
                hexColorSet: newHexColorSet,
                counter: this.state.counter + 1
            })
            this.props.getColorSet(this.state.colorSet); //send colorset data to Layout component
        } else {
            alert("Color Set is Full!")
        }
    }
}
