import React, { Component } from 'react'
import FetchApi from "../../utils/FetchAPI"
import AuthService from "../../handlers/student/AuthService"

class WebIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            constraints: { audio: false, video: { width: 400, height: 300 } },
            msg: null
        }
        this.Auth = new AuthService()
        this.handleStartClick = this.handleStartClick.bind(this)
        this.takePicture = this.takePicture.bind(this)
    }
    componentDidMount() {
        const constraints = this.state.constraints
        const getUserMedia = (params) => (
            new Promise((successCallback, errorCallback) => {
                navigator.webkitGetUserMedia.call(navigator, params, successCallback, errorCallback)
            })
        )

        getUserMedia(constraints)
            .then((stream) => {
                const video = document.querySelector('video')
                const vendorURL = window.URL || window.webkitURL

                video.src = vendorURL.createObjectURL(stream)
                video.play()
            })
            .catch((err) => {
                console.log(err)
            })

    }

    handleStartClick() {
        this.takePicture()
    }

    takePicture() {
        const canvas = document.querySelector('canvas')
        const context = canvas.getContext('2d')
        const video = document.querySelector('video')
        const { width, height } = this.state.constraints.video
        canvas.width = width
        canvas.height = height
        context.drawImage(video, 0, 0, width, height)
        const data = canvas.toDataURL('image/png')
        const format = 'image/png'
        const uploadData = {
            image: data,
            format
        }
        const token = this.Auth.getToken()
        FetchApi('post', '/api/student/check', uploadData, token)
            .then(res => {
                console.log(res.data)
                if (res && res.data && res.data.success) {
                    console.log(res.data.msg)
                    // this.setState({msg: res.data.msg})
                    this.handleStartClick()
                } else {
                    // this.setState({msg: res.data.msg})
                    console.log('Something Went Wrong')
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        const Camera = (props) => (
            <div className="camera"
            >
                <video id="video"
                ></video>
                <a id="startButton"
                    onClick={props.handleStartClick}
                >Start Capturing</a>
            </div>
        )
        return (
            <div className="capture"
            >
                <Camera
                    handleStartClick={this.handleStartClick} />
                <canvas id="canvas"
                    hidden
                ></canvas>
            </div>
        )
    }
}
export default WebIndex
