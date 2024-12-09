import React, {useState} from 'react';
import OrderedProduct from "../product/orderedProduct";
import Card from "../../common/Card";
import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";

const SellerAcceptItem = ({item, setIsEdited, isEdited}) => {

    console.log(item);

    const deliverAllProduct =()=> {
        instance({
            url:`/seller/delivery/approve`,
            method:'POST',
            data:{
                orderId : item.orderId,
                deliveryId : item.deliveryId
            }

        }).then((response) => {
            console.log(response);
            setIsEdited(!isEdited)
        }).catch((error) => {
            console.log(error);
        })
    }

    const rejectAllProduct =()=> {
        instance({
            url:`/seller/delivery/revoke`,
            method:'POST',
            data:{
                orderId : item.orderId,
                deliveryId : item.deliveryId
            }
        }).then(response=>{
            console.log(response);
            setIsEdited(!isEdited)
        }).catch((error) => {
            console.log(error);
        })

    }



    return (
        <Card>
            <DefaultButton className={"default mid"} onClick={deliverAllProduct}>배송</DefaultButton>
            <DefaultButton className={"primary mid"} onClick={rejectAllProduct}>취소</DefaultButton>

            <span>{item.customer}</span>
            <span>{item.orderDate}</span>
            <span>{item.totalPrice}</span>
            {item.deliveryItemDTOList.map((deliveryItem, index) => {
                return (<OrderedProduct key={deliveryItem["orderItemId"]} item={deliveryItem} index={index}
                                        setIsEdited={setIsEdited} isEdited={isEdited}/>)
            })}


        </Card>
    );
};

export default SellerAcceptItem;