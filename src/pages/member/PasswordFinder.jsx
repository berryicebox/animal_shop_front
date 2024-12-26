import { useState } from "react";
import '../../assets/styles/member/passwordFinder.scss'
import AuthSender from "../../components/member/password/AuthSender";
import NewPassword from "../../components/member/password/NewPassword";
import Title from "../../components/common/Title";

const PasswordFinder = () => {

    const [authEmail, setAuthEmail] = useState("");
    const [authText, setAuthText] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    const [authCheck, setAuthCheck] = useState(false);

    return (
        <div className="password-finder-container">
            <Title>비밀번호 찾기</Title>
            <div className="auth-container">
                <AuthSender authEmail={authEmail} setAuthEmail={setAuthEmail}
                authText={authText} setAuthText={setAuthText}
                setAuthCheck={setAuthCheck}
                />
            </div>
            <div className="password-container">
                <NewPassword
                authEmail={authEmail}
                newPassword={newPassword} setNewPassword={setNewPassword}
                checkPassword={checkPassword} setCheckPassword={setCheckPassword} authCheck={authCheck}/>
            </div>
        </div>
    )
}

export default PasswordFinder;