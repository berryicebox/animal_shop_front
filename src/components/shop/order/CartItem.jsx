import Product from "../product/Product";
import "../../../assets/styles/shop/order/cartItem.scss";
import instance from "../../../utils/axios";
import Modal from "../../common/Modal";
import CartModal from "./CartModal";
import DefaultButton from "../../common/DefaultButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Card from "../../common/Card";
import { Link } from "react-router-dom";

const cartItem = (props) => {

  console.log("cartItem", props.data);

  // 장바구니 아이템 삭제
  const handleDeleteItemData = () => {
    
      try {
        if (!props.isSession) {
          const response = instance({
            url: `/cart/delete/${props.data.cartItemId}`, // cartItemId로 API 호출
            method: "delete",
          });
        } else {
          let storageCart = localStorage.getItem("cart");
          storageCart = JSON.parse(storageCart);
  
          storageCart = storageCart.filter((item) => item.cartItemId !== props.data.cartItemId);
          localStorage.setItem("cart", JSON.stringify(storageCart));
        }

        alert("상품이 삭제되었습니다.");

      } catch (error) {
        // 삭제 실패 시
        console.error("삭제 에러 발생:", error);
        alert("상품 삭제에 실패했습니다.");
      }

  };

  // 장바구니 수정
  const handlePostCartList = () => {

    // console.log("postData", postData);
    console.log("props.cartItemId", props.data.cartItemId);

    // 서버 수정
    instance({
      url: `/cart/detail/${props.data.cartItemId}`,
      method: "post",
      data: props.postData,
    })
      .then((res) => {
        console.log("handlePostCartList 성공 ", res.data);
        props.setModalData(res.data);
      })
      .catch((err) => {
        console.log("handlePostCartList 실패 ", err);
        getSessonModalData();
      });
  };

  // 세션 수정 모달 데이터 불러오기
  const getSessonModalData = () => {
    // modaldata의 options에 넣으면 안되는 option의 모든 데이터 (itemNm만 따로 분리 필요)
    let filterData = props.postData["cartDetailDTOList"].filter((data) => (
        data.itemId === props.data.itemId && data.cartItemId !== props.data.cartItemId
    ))

    // console.log("filterData", filterData);

    let storageOptions = localStorage.getItem("options");
    storageOptions = JSON.parse(storageOptions);

    // 현재 카트 아이템의 itemId와 같은 itemId를 가진 세션 options 데이터
    let allOptions = storageOptions.find((options) => 
      options.itemId === props.data.itemId)["options"];

    // console.log("allOptions", allOptions);

    // allOptions에서 filterData만 제외
    for (let i = 0; i < filterData.length; i++){
      allOptions = allOptions.filter((option) => {
        return option.name !== filterData[i].option_name; // 조건을 반드시 return으로 반환
      })
    }

    // console.log("allOptions2", allOptions);

    // 제외된 allOptions를 modalData에 넣기
    // storageOptions.map((option))

    let modalData = {
      cartItemId: props.data.cartItemId,
      cartItemImg: props.data.imgUrl,
      cartItemName: props.data.itemNm,
      options: allOptions,
      itemId: props.data.itemId
    }

    props.setModalData(modalData);
    // console.log(modalData);

  }

  // 선택 아이템 아이디: boolean 형태로 리스트에 넣음
  const handleSelectCartItem = () => {
    props.setSelectedItems((prev) => ({
      ...prev,
      [props.data.cartItemId]: !prev[props.data.cartItemId],
    }));
  };

  return (
    <>
      <div className="cart-item-outer">
        <div className="cart-item-inner">
          <input
            type="checkbox"
            checked={!!props.selectedItems[props.data.cartItemId]} // 선택 여부 반영
            onChange={handleSelectCartItem} // 클릭 시 선택 상태 토글
          />
          {/* <Product data = {props.data} position="cart"/> */}
          <div className="cart-item-info">
            {/* <Link to={`/shop/detail/{props.data.itemId}`}>
            
            </Link> */}
            <div>
              <Link to={`/shop/detail/${props.data.itemId}`}>
              <img
                src={props.data.imgUrl}
                style={{ width: "100px", height: "100px" }}
              />
              </Link>
            </div>
            <div>
              <Link to={`/shop/detail/${props.data.itemId}`}>
                <div className="cart-item-name">{props.data.itemNm}</div>
                <div>
                  {props.data.option_name === "default" ? "기본 옵션" : props.data.option_name}{" "}
                  / {props.data.count}개 /{" "}
                  {props.data.option_price.toLocaleString()}원
                </div>              
              </Link>
              <button onClick={() => {
                props.handleModalOpen();
                handlePostCartList();}}>
                주문수정
              </button>
            </div>
            <div className="item-price-box">
              <p className={props.data.discount_rate > 0 ? "origin" : ""}>
                {(props.data.option_price * props.data.count).toLocaleString()}원</p>
              {props.data.discount_rate > 0 &&
                <p className="discount">
                  {Math.round(props.data.option_price * props.data.count * (1-props.data.discount_rate/100)).toLocaleString()}원
                </p>
              }
            </div>
          </div>
        </div>
        <DefaultButton className={"default-button delete-btn"} onClick={() => {
          handleDeleteItemData();
          props.setDataUpdate(true);}}>
            <FontAwesomeIcon icon={faXmark} />
        </DefaultButton>

        <Modal modalOpen={props.modalOpen} setModalOpen={props.setModalOpen}>
          <CartModal
            modalData = {props.modalData}
            refreshCartList = {props.refreshCartList}
            setModalOpen={props.setModalOpen} modalOpen={props.modalOpen}
          />
        </Modal>

      </div>
    </>
  );
};
export default cartItem;
