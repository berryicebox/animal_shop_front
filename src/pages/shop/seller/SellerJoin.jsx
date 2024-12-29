import "../../../assets/styles/shop/admin/sellerRegister.scss";
import React, {useState} from "react";
import instance from "../../../utils/axios";
import axios, {get} from "axios";
import {useNavigate} from "react-router-dom";
import kakaoSignup from "../../../assets/img/kakao_signup.png";
import Title from "../../../components/common/Title";

// const data =1208800767  -> 테스트용 쿠팡 사업자 번호




const SellerJoin = (props) => {

    const K_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
    const K_REDIRECT_URI = `http://localhost:3000/oauth`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize`;



    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");

    const [bln, setBln] = useState("");
    const [blnInfo, setBlnInfo] = useState("");

    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [blnIsLoading, setBlnIsLoading] = useState(false)

    const [isPhoneNumber, setIsPhoneNumber] = useState(true)
    const [isBLN, setIsBLN] = useState(true)
    const [isInvalidBln, setIsInvalidBln] = useState(false);
    const [isCheckedBln, setIsCheckedBln] = useState(false);
    const [message, setMessage] = useState("")
    const [isInvalidRequest, setIsInvalidRequest] = useState(false);
    const [isAlreadySeller, setIsAlreadySeller] = useState(false);


    const navigate = useNavigate();

    const phoneChecker = (number ,setPhone)=>{
        const regex = /^[0-9]{2,4}$/;
        setIsInvalidRequest(false)

        if(regex.test(number)){
            setIsPhoneNumber(true)
            setPhone(number)
        }else{
            setIsPhoneNumber(false)
        }
    }

    const blnChecker = (number)=>{
        const regex = /^[0-9]{10}$/;
        setIsInvalidRequest(false)
        if(regex.test(number)){
            setIsBLN(true)
            setBln(number)
        }else{
            setIsBLN(false)
        }
    }

    const registerHandler = (e) => {
        e.preventDefault();
        const data = {
            category:category,
            contents :content,
            phoneNumber : phone1+phone2+phone3+"",
            bln : bln
        }

        const canRegister =
            category!=""
            // &isCheckedBln
            // &!isInvalidBln
            &isPhoneNumber
            &data["phoneNumber"].length>10;

        if (canRegister){
            setIsInvalidRequest(false)
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/join/email")



        }
        else{
            setIsInvalidRequest(true)
        }


    }

    const kakaoRegisterHandler = (e) => {
            e.preventDefault();
            const data = {
                category: category,
                contents: content,
                phoneNumber: phone1 + phone2 + phone3 + "",
                bln: bln,
            };
            localStorage.setItem("userInfo", JSON.stringify(data));

            const params = new URLSearchParams({
                client_id:`${K_REST_API_KEY}`,
                redirect_uri:`${K_REDIRECT_URI}`,
                response_type:"code",
                state:"signupSeller"
            })
            window.location.href = `${kakaoURL}?${params.toString()}`;
    }



    const blnAuthChecker = (e) =>{
        const API_KEY = process.env.REACT_APP_BLN_KEY;
        setBlnIsLoading(true)
        e.preventDefault();
        axios({
            url:`https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${API_KEY}`,
            method:"post",
            data:{b_no:[bln]}
        }).then(response=>{
            blnResponseManager(response.data.data[0])
        }).catch(error=>{
            console.log(error)
        })
    }

    const blnResponseManager = (data) =>{
        const stat = data["b_stt_cd"];

        console.log("excuted")
        switch (stat) {
            case "01":
                getBlnDetails()
                setIsInvalidBln(false)
                setIsCheckedBln(true)
                break;
            case "02":
                setMessage("유효하지 않은 사업자 입니다.")
                setIsInvalidBln(true)
                break;
            case "03":
                setMessage("유효하지 않은 사업자 입니다.")
                setIsInvalidBln(true)
                break;
            default:
                setMessage("유효하지 않은 사업자 입니다.")
                setIsInvalidBln(true)

                break;
        }

    }

    const getBlnDetails = () => {
        const BLN_DETAIL_KEY = process.env.REACT_APP_BLN_DETAIL_KEY;

        const url = `https://apis.data.go.kr/1130000/MllBs_2Service/getMllBsBiznoInfo_2` +
            `?serviceKey=${BLN_DETAIL_KEY}&pageNo=1&numOfRows=1&resultType=json&brno=${bln}`
        axios({
            url: url,
            method:"get"

        }).then(response => {
            // console.log("detail")
            // console.log(response.data.items[0])
            setBlnInfo(response.data.items[0])
            setBlnIsLoading(false)

        }).catch(error => {
            console.log(error)
        })
    }


    return (<>
        <Title>판매자 회원가입</Title>


        <div className="form-container">
            <form className="seller-register-form">
                <span>판매자 가입을 환영합니다!</span>
                <hr/>

                <label htmlFor="phone">휴대전화</label>
                <div className="split-input">
                    <input onChange={(e) => phoneChecker(e.target.value,
                        setPhone1)}
                           type="tel"
                           maxLength="3"/>
                    <span>-</span>
                    <input onChange={(e) => phoneChecker(e.target.value,
                        setPhone2)}
                           type="tel"
                           maxLength="4"/>
                    <span>-</span>
                    <input onChange={(e) => phoneChecker(e.target.value,
                        setPhone3)}
                           type="tel"
                           maxLength="4"/>
                </div>
                {isPhoneNumber ? null : <span className="warning">올바른 값을 입력해 주세요.</span>}

                <label htmlFor="category">카테고리</label>
                <select id="category" name='category'
                        onChange={(e) => setCategory(e.target.value)}>
                    <option value='placeholder' disabled hidden selected>카테고리
                    </option>
                    <option value='meal'>사료</option>
                    <option value='treat'>간식</option>
                    <option value='goods'>용품</option>
                    <option value='etc'>기타(설명란에 적어주세요.)</option>

                </select>
                <label htmlFor="info">물품설명</label>
                <input className="info" type="text"
                       placeholder="판매하실 물품에 대한 설명을 해주세요."
                       onChange={(e) => setContent(e.target.value)}/>

                <label htmlFor="bln">사업자등록번호</label>
                <div className="split-input">
                    <input onChange={(e) => blnChecker(e.target.value)}
                           className="BLN" type="tel"
                           maxLength="10"
                           placeholder="사업자등록번호"/>
                    <button onClick={blnAuthChecker}
                            className="bln-confirm">조회
                    </button>
                </div>
                {isBLN ? null : <span
                    className="warning">올바른 값을 입력해 주세요.</span>}
                {isInvalidBln && <span className="warning">{message}</span>}
                {blnInfo &&<>
                    <span>[{blnInfo["bzmnNm"]}] </span> <span>{blnInfo["rprsvNm"]} 대표님</span></>}
                {(blnIsLoading)&&<><span> 사업자번호를 검증중입니다. </span> <span>잠시만 기다려주세요</span></>}
                {isInvalidRequest && <span className="warning">값을 확인해주세요</span>}
                {isAlreadySeller && <span className="warning">이미 권한을 신청한 판매자 입니다.</span>}


                <button onClick={registerHandler} className="register">이메일
                    회원가입
                </button>
                <button className={"kakao-signup"}
                        onClick={(e)=>{kakaoRegisterHandler(e)}}
                        style={{
                            backgroundImage: `url(${kakaoSignup})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center" /* 이미지 가운데 정렬 */

                        }}
                >
                </button>
                <span className="placeholder">관리자 권한 승인후 판매자로 등록됩니다.</span>
                <hr/>

                <span>테스트용 쿠팡 사업자 1208800767</span>
                <span>테스트용 ssg 사업자 8708801143</span>
                <span>이나바펫푸드 8228101543</span>
            </form>


        </div></>
    )
}
export default SellerJoin