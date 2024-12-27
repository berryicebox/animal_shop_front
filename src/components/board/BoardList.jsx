import BoardItem from "./BoardItem";
import WriteButton from "./WriteButton";
import Pagination from "./Pagination";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Information from "../layout/Information";
import Title from "../common/Title";

const BoardList = (props) => {

    const {category} = useParams();
    let categoryValue;
    if (category == null) {
        categoryValue = "new";
    } else {
        categoryValue = category;
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState();

    const token = localStorage.getItem('accessToken') || null;

    let url = `${process.env.REACT_APP_API}/post/${categoryValue}?page=${currentPage}`;

    if (props.keyword) {
        url = `${process.env.REACT_APP_API}/post/search/title?keyword=${props.keyword}&page=${currentPage}`
    }

    useEffect(() => {
        // console.log(category);
        axios({
            url: url,
            method: "GET",

        }).then((response) => {
            setData(response.data);
            setLoading(false);
            // console.log(response.data.total);
        }).catch((error) => {
            setError(true);
        })
    }, [currentPage, props.keyword, category])

    useEffect(() => {
        setCurrentPage(1);
    }, [category])


    const handlePageChange = (newData) => {
        setCurrentPage(newData);
    };


    if (loading) {
        return <div>loading</div>
    }
    if (error) {
        return <div>error</div>
    }

    return (<>
            <Title>커뮤니티</Title>
            {data && data.posts.map((data) => {
                return (
                    // <BoardItem key={data.id} id={data.id} userId={data.userId} itemTitle={data.title}/>
                    <BoardItem key={data.id} data={data}/>
                );
            })}
            {(props.isAuth || token) ? <WriteButton/> : null}
            {data.totalCount == 0 && <Information case = "dataNan"/>}
            {data && data.totalCount >= 10 && <Pagination
                totalPost={data.totalCount}
                currentPage={currentPage}
                handlePageChange={handlePageChange}/>
            }
        </>


    )
}

export default BoardList