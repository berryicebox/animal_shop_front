import axios from "axios";
import {useEffect, useState} from "react";
import SellerInfoItem from "./SellerInfoItem";
import instance from "../../../utils/axios";
import Pagination from "../../board/Pagination";
import AdminMenu from "./AdminMenu";
import Title from "../../common/Title";

const SellerManagement = (props) => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [totalSeller, setTotalSeller] = useState()
    const [isEdited, setIsEdited] = useState(false)


    useEffect(() => {
        instance({
            url:`/admin/request-list?page=${page}`,
            method:"get"
        }).then((response) => {
            setData(response.data.sellerDTOS);
            setTotalSeller(response.data.totalCount)

            // console.log(response);

        }).catch(error => {
            console.log(error)
        })
    },[page,isEdited])

    const header = {
        username: "이름",
        bln: "사업자 번호",
        phone_number: "전화번호",
        category : "카테고리",
        contents:"신청 상세"
    }


    return (<>
        <AdminMenu/>
        <Title>판매자 관리</Title>
        <SellerInfoItem isHeader = {true} item={header}/>
        {data&&data.map((item) =>{
            return(
                <SellerInfoItem key={item.bln} item={item} setIsEdited={setIsEdited} isEdited={isEdited}/>
            )})
        }
        <Pagination currentPage={page} handlePageChange={setPage} totalPost={totalSeller}/>
    </>)
}
export default SellerManagement;