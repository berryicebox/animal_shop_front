import React from 'react';
import {Link} from "react-router-dom";
import {useModifyTime} from "../../../../utils/useModifyTime";


const AdminNoticeItem = ({item, isSeller}) => {
    const modifiedTime = useModifyTime(item?.created_date);


    return (
        <Link to={`/${isSeller?"seller":"admin"}/notice/${item.id}`}>


            <div className={item.priority===0?"important list-container":"list-container"}>
                    <div className={"info"}>
                        <div className={"title"}>
                            <span>{item.priority == 0 ? <span className="important">필독</span> : ''}</span>

                            <span> {item.title} </span>
                        </div>

                        <div className={"detail-info"}>

                        <div className={"author-info"}>
                                <span> {item.name} </span>
                                <span>{item.priority}</span>

                                <span>{modifiedTime}</span>
                            </div>

                        </div>

                    </div>
            </div>


        </Link>


    );
};

export default AdminNoticeItem;