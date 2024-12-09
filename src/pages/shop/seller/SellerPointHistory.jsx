import React, { useEffect, useState } from 'react';
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import instance from "../../../utils/axios";
import HistoryItem from "../../../components/shop/seller/HistoryItem";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";

const SellerPointHistory = () => {
    const [data, setData] = useState([]);
    const [prevIndex, setPrevIndex] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        // 종료 날짜 계산
        const end = new Date();
        end.setDate(end.getDate() + 1);
        end.setMonth(end.getMonth() - prevIndex);
        if (prevIndex > 0) end.setDate(15);

        // 시작 날짜 계산
        const start = new Date(end);
        start.setMonth(start.getMonth() - 1);
        start.setDate(15);

        setStartDate(start);
        setEndDate(end);

        // API 호출
        instance({
            url: `/point/entire-sum-seller`,
            method: "get",
            params: {
                time: "day",
                start: `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`,
                end: `${end.getFullYear()}-${(end.getMonth() + 1).toString().padStart(2, "0")}-${end.getDate().toString().padStart(2, "0")}`
            }
        })
        .then(res => setData(res.data))
        .catch(err => {
            console.error(err);
        });

    }, [prevIndex]);
    const totalPoints = data.reduce((sum, item) => sum + (item.point || 0), 0);

    return (
        <div>
            <SellerMenu/>
            <p>정산 예정 금액 {totalPoints}</p>
            <div>
                <button onClick={() => setPrevIndex(
                    prev => prev + 1)}>{"<"}</button>
                <span>{`${startDate.getFullYear()}
                -${(startDate.getMonth() + 1).toString().padStart(2, "0")}
                -${startDate.getDate().toString().padStart(2, "0")}`}</span>
                <span> ~ </span>
                <span>{`${endDate.getFullYear()}
                -${(endDate.getMonth()+ 1).toString().padStart(2,"0")}
                -${endDate.getDate().toString().padStart(2,"0")}`}</span>
                <button onClick={() => setPrevIndex(
                    prev => Math.max(prev - 1, 0))}>{">"}</button>
            </div>
            test
            <div className="stat-analysis-table">
            {data&&<StatAnalysisTable data={data} colName1={"date"} colName2={"point"}/>}
            </div>

        </div>
    );
};

export default SellerPointHistory;