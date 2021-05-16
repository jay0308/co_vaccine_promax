import React, { Component } from "react";
import s from "./addpost.module.scss";
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageInputField from "./ImageInputField";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openClass: "",
            imag1: "",
            imag2: "",
            imag3: "",
            imag4: "",
            imag5: "",
            postComment: ""
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                openClass: s["open"]
            })
        }, 150)
    }
    closeHandler = () => {
        this.setState({
            openClass: ""
        })
        setTimeout(() => {
            this.props.closeHandler()
        }, 150)
    }
    handlePostComment = (e) => {
        this.setState({
            postComment: e.target.value
        })
    }
    getImageUrl1 = (url) => {
        this.setState({ imag1: url })
    }
    getImageUrl2 = (url) => {
        this.setState({ imag2: url })
    }
    getImageUrl3 = (url) => {
        this.setState({ imag3: url })
    }
    getImageUrl4 = (url) => {
        this.setState({ imag4: url })
    }
    getImageUrl5 = (url) => {
        this.setState({ imag5: url })
    }
    postSubmit = () => {
        if (!this.state.postComment && !this.state.imag1 && !this.state.imag2 && !this.state.imag3 && !this.state.imag4 && !this.state.imag5) {
            alert("Add somehting to post");
            return false;
        }
        var formData = new FormData();
        formData.append("postComment", this.state.postComment);
        let images = [];
        this.state.imag1 && images.push(this.state.imag1)
        this.state.imag2 && images.push(this.state.imag2)
        this.state.imag3 && images.push(this.state.imag3)
        this.state.imag4 && images.push(this.state.imag4)
        this.state.imag5 && images.push(this.state.imag5);
        images.length > 0 && images.map((e,i)=>{
            formData.append(`postImages`, e)
        })
        this.props.createPost(formData);
    }
    render() {
        const { openClass, postComment } = this.state;
        return (
            <div className={`${s.addPostBox} ${openClass}`}>
                <div className={s.postBoxInner}>
                    <span onClick={this.closeHandler} className={s.closeBtn}><CloseIcon /></span>
                    <div className={s.poster}>
                        <div className={s.posterProfile}>
                            <div className={s.profileImg}>
                                <span></span>
                            </div>
                            <div className={s.postComment}>
                                <TextareaAutosize
                                    rowsMax={6}
                                    rowsMin={3}
                                    aria-label="maximum height"
                                    placeholder="Add something in your mind"
                                    value={postComment}
                                    onChange={this.handlePostComment}
                                />
                            </div>
                        </div>
                        <div className={s.addImgBox}>
                            <ImageInputField s={s} getImageUrl={this.getImageUrl1} />
                            <ImageInputField s={s} getImageUrl={this.getImageUrl2} />
                            <ImageInputField s={s} getImageUrl={this.getImageUrl3} />
                            <ImageInputField s={s} getImageUrl={this.getImageUrl4} />
                            <ImageInputField s={s} getImageUrl={this.getImageUrl5} />

                        </div>
                        <button className={s.postBtn} onClick={this.postSubmit}>Post</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPost