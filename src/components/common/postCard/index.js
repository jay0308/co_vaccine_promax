import React, { useState } from "react";
import s from "./postcard.module.scss";
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import webViewInterface from "../../../utils/WebView";



const PostCard = (props) => {
    // Declare a new state variable, which we'll call "liked"
    const [liked, setLiked] = useState(false);
    return (
        <div className={s.postCardBox}>
            <div className={s.postCardBoxInner}>
                <div className={s.postedBy}>
                    <div className={s.userImg}>
                        <span></span>
                    </div>
                    <div className={s.userName}>{props.name}</div>
                </div>
                <div className={`${s.contentBox} ${s[props.postType]}`}>
                    {
                        props.images &&
                        props.images.length > 0 &&
                        <div className={s.postImg}>
                            {
                                props.images.map((e, i) => {
                                    return (
                                        <img src={e.replace("amp;", "")} key={new Date().getTime() + i} alt={"Post media"} />
                                    )
                                })
                            }
                        </div>

                    }
                    {
                        props.content &&
                        <div className={s.postConent}>
                            {props.content}
                        </div>
                    }
                </div>
                <div className={s.likesBox}>
                    <div className={s.totalLikes}>
                        <span className={s.totalLike}><span className={s.icon}><ThumbUpAltRoundedIcon /></span>{props.likers && props.likers.length}</span>
                        <span className={s.postDate}>{new Date(props.date).toDateString()}</span>
                    </div>
                    <div className={s.postActions}>
                        {
                            (props.likers && props.likers.indexOf(props.userDataReducer._id) > -1) || liked ?
                                <span className={s.likeBtn}><ThumbUpAltRoundedIcon /></span>
                                :
                                <span className={s.likeBtn} onClick={() => { setLiked(true); props.likePost(props.postId) }}><ThumbUpAltOutlinedIcon /></span>

                        }

                        <span className={s.shareBtn} onClick={()=>{alert("fffff");webViewInterface.testMessage("Hellloo babe")}}><img src="/images/whatsApp.svg" alt="whatsapp icon" /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard