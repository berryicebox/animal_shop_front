import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import instance from "../../../utils/axios";
import DefaultButton from "../../common/DefaultButton";
import { toast } from "react-toastify";

const Product = (props) => {

   // console.log("props.data", props.data);

    let cart = [];
    const optionCount = props.data?.option_count;
    let storageCart = localStorage.getItem("cart");
    const price = ( (props.data?.price ?? props.data?.options?.[0]?.price) || 0);
    const discountRate = (props.data?.discount_rate ?? props.data?.options?.[0]?.discount_rate);
    const imgUrl =  Array.isArray(props?.data["thumbnail_url"])
            ? props?.data["thumbnail_url"][0]
            : props?.data["thumbnail_url"]

    const handlePostCart = async (item) => {

        try {
            const response = await instance({
                url: "/cart/add",
                method: "post",
                data: item
            });

            // 성공적으로 데이터가 저장된 경우
            console.log('장바구니 데이터 등록 성공:', response.data);

        } catch (error) {
            // 에러가 발생한 경우
            console.log('장바구니 데이터 에러 발생:', error);
        }
    }

    const addOptions = () => {

        let sessionOptions = {
            itemId: props.data?.id,
            options: [{
                name: props.data?.name,
                price: props.data?.price,
                optionId: props.data?.id,
                discountRate: props.data?.discount_rate    
            }]
        }

        console.log("sessionOptions", sessionOptions);

        let storageOpitons = localStorage.getItem("options");
        storageOpitons = storageOpitons ? JSON.parse(storageOpitons) : [];

        let validItemId = storageOpitons.find(options =>
            sessionOptions.itemId === options.itemId)

        if (!validItemId) {
            storageOpitons.push(sessionOptions);
            localStorage.setItem("options", JSON.stringify(storageOpitons));
        }
    }

    const addCart = () => {
        // 서버 통신용 데이터
        const item = {
            itemId: props.data?.id,
            count: 1,
        };

        let storageCart = localStorage.getItem("cart");

        // 세션 저장용 데이터
        const sessionItem = {
            cartItemId: props.data?.id + "default",
            itemNm: props.data?.name,
            count: 1,
            option_name: "default",
            option_price: props.data?.price,
            imgUrl: props.data?.thumbnail_url,
            itemId: props.data?.id
        }

        if (storageCart){
            let isExist = false;

            storageCart = JSON.parse(storageCart);
            storageCart.every(cartItem=>{
                     if (cartItem.cartItemId === sessionItem.cartItemId) {
                        cartItem.count = cartItem.count+1;
                         isExist = true;
                        return false;

                    }else {
                        return true;
                    }
                }
            )
            if (!isExist){
                // console.log(isExist);
                // console.log("isNotExist!");
                storageCart.push(sessionItem);
            }

            addOptions();
            localStorage.setItem("cart", JSON.stringify(storageCart));

        }else {
            cart.push(sessionItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            addOptions();
        }

        handlePostCart(item);
        toast.success("장바구니에 담았습니다!");
    }

    return(

          <div className={props.position}>
              <Link to={`/shop/detail/${props.data?.id}`}>

              <img src={imgUrl} alt=""/>
              <div className="product-info">
                  <span className="brand">{props.data?.nickname}</span>
                  <span className="title">{props.data?.name}</span>
                  {discountRate > 0 ?
                    <div>
                        <p className="origin-price">
                            {price.toLocaleString()}원
                        </p>
                        <span className="discount-rate">
                             {(discountRate || 0)}%
                        </span>
                        <span className="price">{(price * (100 - discountRate)/100).toLocaleString()}</span>
                    </div> :
                      <div>
                          <span className="price">{(price).toLocaleString()}원</span>
                          <p className="origin-price no-decoration">{"ㅤ"}</p>

                      </div>
                  }

                  <div className="option">
                  <span className="option">참치맛</span>
                      <hr className="vertical"/>
                      <span className="count">{props.data?.count}</span>
                  </div>
                  <div className="star-box">
                    <span className="star"><FontAwesomeIcon icon={faStar}/>{props.data?.rating}</span>  
                  </div>
                  
              </div>
              </Link>
              {props.position==="product" && (
                  <div className="cart-button-container">
                      {optionCount > 1 ?
                          <Link to={`${process.env.REACT_APP}/shop/detail/${props.data?.id}`}>
                              <DefaultButton className="cart-button wd100">옵션선택</DefaultButton>
                          </Link> :
                          ( <DefaultButton
                              onClick={addCart}
                              className="cart-button wd100">
                              장바구니
                          </DefaultButton> )}
                  </div>
              )}

          </div>
      )
}

export default Product;