import React, { Component } from "react";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import ImageCompressor from "image-compressor";


class ImageInputField extends Component {
    state = {
        isImgFile: false,
        imgBlob: ""
    }
    readURL = () => {
        let input = this.refs.input
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
                this.setState({
                    imgBlob: e.target.result,
                    isImgFile: true
                })

                this.props.getImageUrl(input.files[0])

                // var imageCompressor = new window.ImageCompressor();
    
                // var compressorSettings = {
                //     toWidth: 100,
                //     toHeight: 100,
                //     mimeType: 'image/png',
                //     mode: 'strict',
                //     quality: 0.6,
                //     grayScale: true,
                //     sepia: true,
                //     threshold: 127,
                //     vReverse: true,
                //     hReverse: true,
                //     speed: 'low'
                // };
    
                // imageCompressor.run(e.target.result, compressorSettings, this.props.getImageUrl);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    render() {
        const s = this.props;
        const { isImgFile } = this.state;
        return (
            <div className={s.imgBox}>
                {
                    !isImgFile ?
                        <InsertPhotoIcon /> :
                        <img src={this.state.imgBlob} alt="blob" />
                }
                <input ref="input" onChange={this.readURL} type="file" accept="image/*" />
            </div>
        )
    }
}

export default ImageInputField;