import React, {useEffect, useState} from 'react';
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import {Link} from "react-router-dom";
import ItemDelButton from "../../../components/shop/seller/itemList/itemDelButton";
import Chart from "../../../components/common/Chart";
import axios from "axios";
import Products from "../../../components/shop/product/Products";
import SellerItem from "../../../components/shop/seller/itemList/SellerItem";
import AdminProduct from "../../../components/shop/admin/AdminProduct";
import Pagination from "../../../components/board/Pagination";
import ProductSearchHeader from "../../../components/shop/admin/ProductSearchHeader";

const ProductManagement = () => {
    const [data, setData] = useState()
    const [page, setPage] = useState(1)
    const [isEdited, setIsEdited] = useState(false)
    const [totalPost, setTotalPost] = useState(0)


    useEffect(() => {
        axios({
            url:`http://localhost:8080/shop/best?page=${page}`,
            method: "get",
        }).then(res=>{
            console.log(res.data)
            console.log(res.data["goods"][0])

            setData(res.data["goods"]);
            setTotalPost(res.data["total_count"])

        })
    },[page])

    return (
        <div>
            <AdminMenu/>

            <span>판매 상품 관리</span>
            <ProductSearchHeader/>
            <div className="admin-product">
                <div className="product">
                    <div className="product-info">
                        <span> 이미지 </span>
                        <span className="title">상품명</span>
                        <span className="brand">판매자</span>
                        <span className="price">가격</span>
                        <span>판매중단</span>
                    </div>
                </div>
            </div>


            <div className="admin-products">
                {data && data.map(
                    item => {
                        return <AdminProduct key={item.id} item={item}
                                             isEdited={isEdited} setIsEdited={setIsEdited}/>}
                )}
            </div>
            <Pagination itemPerPage={20} currentPage={page} handlePageChange={setPage} totalPost={totalPost}/>
        </div>
    );
};

export default ProductManagement;