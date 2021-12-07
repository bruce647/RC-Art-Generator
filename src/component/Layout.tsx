import React, { Component } from 'react';
import { PageHeader, Slider, TreeSelect, Row, Col, Layout, Breadcrumb, Divider } from 'antd';
import ColorSelecter from './ColorPicker'
import { Font } from './style'
import * as view from './Wrapper'
import { ReactP5Wrapper, Sketch } from 'react-p5-wrapper'

interface MyProps {
}

interface MyState {
    density: number | null,
    setValue: any,
    wrapperFunction: Sketch,
    colorSet: Array<number> | null
}

class LayoutComp extends Component<MyProps, MyState>{

    constructor(props: MyProps) {
        super(props)
        this.state = {
            density: null, //density of the element
            setValue: null, //stroke color
            colorSet: null, //color elements set
            wrapperFunction: view.default //sketch func from Wrapper.tsx
        }
        this.onChange = this.onChange.bind(this)
        this.treeoOnChange = this.treeoOnChange.bind(this)
        this.handleGenerateBtn = this.handleGenerateBtn.bind(this)
    }

    render() {
        const { TreeNode } = TreeSelect;
        const { Content, Footer, Sider } = Layout;
        const funcProps = {
            getColorSet: this.getColorSetData.bind(this),
        }
        return (
            <>

                <Layout>

                    <PageHeader
                        className="site-page-header"
                        title="Gnerate Your Own Artwork!"
                        subTitle="Bruce Lan"
                        style={{ background: 'white' }}
                    />

                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>


                            <Sider className="site-layout-background" style={{ background: 'white', padding: '15px' }} width={700}>
                                <Font>Density of the element:</Font>
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={50}
                                            onChange={this.onChange}
                                            value={typeof this.state.density === 'number' ? this.state.density : 0}
                                        />
                                    </Col>
                                </Row>
                                <Divider />
                                <Font>Stroke color:</Font>
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    value={this.state.setValue}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={this.treeoOnChange}
                                >
                                    <TreeNode value="darkblue" title="Dark Blue" />
                                    <TreeNode value="blue" title="Blue" />
                                    <TreeNode value="orange" title="Orange" />
                                    <TreeNode value="red" title="Red" />
                                </TreeSelect>
                                <Divider />
                                <Font>Pick 3 primary colors:</Font>
                                <ColorSelecter {...funcProps} />
                                <Divider />
                                {/* <Button type="primary" size="large" style={{ background: 'black' }} onClick={this.handleGenerateBtn}>
                                    Gnerate
                                </Button> */}
                            </Sider>

                            <Content style={{ padding: '0 24px', minHeight: 180, background: '#7F7C82' }}>
                                <PageHeader
                                    className="site-page-header"
                                    title="Prompt:"
                                    style={{color:'white', width:'100%' }}
                                />
                                <ReactP5Wrapper
                                    sketch={this.state.wrapperFunction}
                                    density={this.state.density}
                                    stroke={this.state.setValue}
                                    colorSet={this.state.colorSet} />
                            </Content>

                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}><Font>Ant Design ©2018 Created by Bruce Lan</Font></Footer>
                </Layout>

            </>
        )
    }
    //set the value of th density
    onChange(value: number) {
        this.setState({
            density: value,
        });
    };
    //set the value of the stroke color
    treeoOnChange(value: any) {
        this.setState({
            setValue: value,
        });
    };
    handleGenerateBtn() {
        console.log(this.state)
    };
    //send colorSet to P5 warapper
    getColorSetData(colorSet: any) {
        if (colorSet.length === 3)
            this.setState({
                colorSet: colorSet
            })
    }
}

export default LayoutComp
