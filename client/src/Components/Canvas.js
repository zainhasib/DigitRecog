import React, { Component } from 'react';
import axios from 'axios';

let prevX = 0
let prevY = 0
let first = true

class Canvas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pressed: false,
            image: "",
            number: null
        }

        this.handleMouseDraw = this.handleMouseDraw.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
        this.prepareImageFromCanvas = this.prepareImageFromCanvas.bind(this)
    }

    componentDidMount() {
        const canvas = document.getElementById('canvas')
        console.log(canvas.getBoundingClientRect().left)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        console.log(this.props.getImage)
    }

    handleMouseDraw(e) {
        const canvas = document.getElementById('canvas')
        const { top, left } = canvas.getBoundingClientRect()
        const ctx = canvas.getContext('2d')
        ctx.strokeStyle="#fff"
        ctx.lineWidth = 18
        if(this.state.pressed) {
            if(first) {
                prevX = e.clientX - left
                prevY = e.clientY - top
                first = false
            }else {
                ctx.moveTo(prevX, prevY)
                ctx.lineTo(e.clientX - left, e.clientY - top)
                prevX = e.clientX - left
                prevY = e.prevY - top
                ctx.stroke()
            }
        }
    }

    handleMouseDown(e) {
        this.setState({
            pressed: true
        })
    }

    handleMouseUp(e) {
        this.setState({
            pressed: false
        })
        first = true
    }

    handleMouseOut(e) {
        this.setState({
            pressed: false
        })
        first = true
    }

    urltoFile(url, filename, mimeType){
        mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename, {type:mimeType});})
        );
    }    

    prepareImageFromCanvas() {
        const canvas = document.getElementById('canvas')
        const img = canvas.toDataURL("image/png")
        this.props.fetchImage(img)
        return img
    }

    handleProcess() {
        const image = this.prepareImageFromCanvas()
        axios.post('http://127.0.0.1:3001/upload/', {
            image:image,
            number: this.state.number
        })
            .then(res => console.log(res))
    }

    render() {
        return (
            <div>
                <canvas id="canvas" width={280} height={280} 
                    onMouseMove={this.handleMouseDraw} 
                    onMouseDown={this.handleMouseDown} 
                    onMouseUp={this.handleMouseUp}
                    onMouseOut={this.handleMouseOut}
                />
                <input type="text" onChange={e => this.setState({number: e.target.value})} />
                <button className="process-btn" onClick={this.handleProcess.bind(this)} >PROCESS</button>
            </div>    
        );
    }
}

export default Canvas;