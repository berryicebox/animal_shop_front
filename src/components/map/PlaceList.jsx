import React, {useEffect, useState} from 'react';
import PlaceListItem from "./PlaceListItem";
import instance from "../../utils/axios";
import DetailInfoWindow from "./DetailInfoWindow";
import Pagination from "../board/Pagination";

const PlaceList = ({page, setPage, totalPost, data, selectedItemId, setSelectedItemId}) => {
// const PlaceList = ({data}) => {

    // const [selectedItemId, setSelectedItemId] = useState(null)
    const [detailInfoWindow, setDetailInfoWindow] = useState(false)
    const [detailInfo, setDetailInfo] = useState(null)
    const [isEdited, setIsEdited] = useState(false)

    useEffect(() => {
        if (selectedItemId){
        instance({
            url: `/map/detail?mapId=${selectedItemId}`,
            method: "POST",
        }).then((response) => {

            setDetailInfo(response.data)

            // setDetailInfoWindow(true)
        }).catch((error) => {
            console.log(error);
        })}
    },[selectedItemId, isEdited])

    return (
        <div className="place-list-container">


            {!selectedItemId&&data&&data.map((item, index) => (
                <PlaceListItem key={index} item={item}  setSelectedItemId={setSelectedItemId}/>
            ))}
            {!selectedItemId&&<Pagination totalPost={totalPost} btnCount={5}
                                          handlePageChange={setPage}
                                          currentPage={page} itemPerPage={15}/>

            }
            {selectedItemId&&detailInfo&&<DetailInfoWindow selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} item={detailInfo} isEdited={isEdited} setIsEdited={setIsEdited}/>}


        </div>
    );
};

export default PlaceList;