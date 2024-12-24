import "../../assets/styles/comment/comment.scss"
import {useEffect, useState} from "react";
import CommentEditor from "./CommentEditor";
import instance from "../../utils/axios";
import {useModifyTime} from "../../utils/useModifyTime";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";

import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Comment = ({parentList, comment, commentSummited, setCommentSummited, idNicknameMap}) => {
    let url;
    const [edit, setEdit] = useState(false)
    const [reply, setReply] = useState(false)
    const [del, setDel] = useState(false)
    const modifiedTime = useModifyTime(comment.createdDate)
    const [isAuthor, setIsAuthor] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        getAuthor();
        getAuth();
    }, [])

    useEffect(() => {
        setCommentSummited(true)
        setDel(false)
    }, [edit, del, heart])

    if (comment.imageUrl) {
        url = `${process.env.REACT_APP_API}/file/comment?filename=` + comment.imageUrl[0]
    }

    if (edit) {
        return (<CommentEditor isEdit={true} edit={edit} setEdit={setEdit} comment={comment}/>)
    }
    const getAuth = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {setIsAuth(true)}
        else  {setIsAuth(false)}
    }
    const getAuthor = () => {
        instance({
            url: `${process.env.REACT_APP_API}/comment/update/${comment.id}`,
            method: "GET"
        }).then((response) => {
                if (response.data === true) {
                    setIsAuthor(true)
                }
            }
        ).catch((error) => {
            console.log(error)
        })

    }

    const deleteHandler = () => {
        instance({
            url: `${process.env.REACT_APP_API}/comment/delete/${comment.id}`,
            method: "DELETE"
        }).then(() => {
                setDel(true)
            }
        ).catch((error) => {
            console.log(error)
        })
    }

    const heartHandler = (method) => {
        instance({
            url: `/comment_heart/${method}/${comment.id}`,
            method:"get"

        }).then((response) => {
            console.log(response.data)
            setHeart(!heart)})
            .catch((error) => {console.log(error)})
    }

    return (<>

            <div id={comment.id} className={ comment.parent ? "comment child" : "comment"}>
                <div className="info-section">
                    <div className="author-info" >
                        {!parentList.has(comment.parent?.id) ? <span> {idNicknameMap&&idNicknameMap[comment.parent?.id]} </span> : null}
                        <span className="nickname"> {comment.nickname} </span>
                        <span className="modified-time"> {modifiedTime} </span>
                        <span className="heart"> <FontAwesomeIcon icon={solidHeart}/>{" "+comment.countHeart} </span>
                    </div>
                    <span> {comment.content} </span>

                    {comment.imageUrl && <img className="commentImg" src={url}/>}
                </div>

                <div className={"edit-section"}>
                    {isAuth ? <>
                        {!comment.heart ?
                            <button onClick={() => heartHandler("add")}><FontAwesomeIcon icon={regularHeart}/>좋아요</button>:
                            <button onClick={() => heartHandler("delete")}><FontAwesomeIcon icon={solidHeart}/>취소</button>}

                        <button onClick={() => setReply(!reply)}><FontAwesomeIcon icon={faReply}/>댓글작성</button>
                    </> : null}
                    {isAuthor ?
                        (<>
                            <button onClick={() => setEdit(true)}><FontAwesomeIcon icon={faPenToSquare}/>수정</button>
                            <button onClick={deleteHandler}><FontAwesomeIcon icon={faXmark}/> 삭제</button>
                        </>) : null}

                </div>
            </div>
            {reply ?
                <CommentEditor setCommentSummited={setCommentSummited} isReply={true} reply={reply} setReply={setReply}
                               parentId={comment.id}/> : null}
            {/*<hr/>*/}


        </>

    )
}

export default Comment