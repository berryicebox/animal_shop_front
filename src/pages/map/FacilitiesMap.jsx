import React, {useEffect, useState} from 'react';
import "../../assets/styles/map/facilitiesMap.scss"
import Map from "../../components/map/Map";
import instance from "../../utils/axios";
import PlaceList from "../../components/map/PlaceList";
import PlaceFilter from "../../components/map/PlaceFilter";
import SearchBar from "../../components/map/SearchBar";
import Title from "../../components/common/Title";
import Card from "../../components/common/Card";
import {toast} from "react-toastify";
const FacilitiesMap = () => {
    const [data, setData] = useState()
    const [search, setSearch] = useState()
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [mappingData, setMappingData] = useState({})

    const [totalPost, setTotalPost] = useState(0)
    const [page, setPage] = useState(1)
    const params = new URLSearchParams(window.location.search);
    const selected = params.get("selected");


    const [firstRender, setFirstRender] = useState(true)
    const [currLocation, setCurrLocation] = useState(
        {lat: 0, lng: 0},
    )

    const [Bounds, setBounds] = useState({
        swLatlng: {
            latitude: 0,
            longitude: 0
        },
        neLatlng: {
            latitude: 0,
            longitude: 0
        }
    })

    const [searchData, setSearchData] = useState({
        keyword: "",
        parking:false,
        indoor:false,
        outdoor:false,
        category: null,

    })
    let markerList = [];

    useEffect(() => {
        // // 페이지 로드 시 스크롤 막기
        // document.body.style.overflow = "hidden";
        //
        // return () => {
        //     // 페이지 벗어날 때 스크롤 복원
        //     document.body.style.overflow = "auto";
        // };
    }, []);

    useEffect(() => {
        console.log("selected", selected);

        if (selected) {
            setSelectedItemId(selected);
            console.log("selected", selected);
        }
        else {
            console.log("selected is null");
        }

    }, [selected]); // selectedItemId가 변경될 때 실행


    useEffect(() => {
        console.log("Bounds",Bounds)
        instance({
            url:`/map/search?page=${page}`,
            method:"post",
            data:{
                keyword: searchData.keyword,
                parking: searchData.parking,
                indoor: searchData.indoor,
                outdoor: searchData.outdoor,
                category:searchData.category,
                swLatlng: Bounds.swLatlng,
                neLatlng: Bounds.neLatlng

            }
        }).then((res) => {
            setData(res.data.mapPositionDTOList);
            setTotalPost(res.data.total_count)
            console.log(res.data)
            if (res.data.mapPositionDTOList.length === 0) {
                if (firstRender) {
                    setFirstRender(false)
                }else{
                    toast.info("지도 내 검색 결과가 없습니다.")
                }

            }
        }).catch((err) => {
            console.log(err)
        })
    }, [search, page]);



    return (<>
        <Title>반려동물 시설찾기</Title>
        <div className="map-outer-container">

            <div className="map-list">
                {data&&<>

                    {!selectedItemId&&<PlaceFilter  searchData={searchData} setSearchData={setSearchData} />}
                    {!selectedItemId&&<SearchBar searchData={searchData} setSearchData={setSearchData}
                                                 search={search} setSearch={setSearch}
                                                 page={page} setPage={setPage}/>}

                    <PlaceList page={page} setPage={setPage}
                               totalPost={totalPost} selectedItemId={selectedItemId}
                               setSelectedItemId={setSelectedItemId} data={data}/>
                </>
                }
                {/*{data&&<PlaceList data={data}/>}*/}

            </div>

            {data&&<Map selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}
                        mappingData={mappingData} setMappingData={setMappingData}
                        search={search} setSearch={setSearch} setPage={setPage}
                        currLocation={currLocation} setCurrLocation={setCurrLocation}
                        setBounds={setBounds} data={data}/>}

        </div></>
    );
}

export default FacilitiesMap;