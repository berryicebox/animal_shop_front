import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080",
});
let isInvalidToken = false;

// 요청 인터셉터
instance.interceptors.request.use(function (config) {

    // console.log(isInvalidToken);
    // 스토리지에서 토큰을 가져온다.
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 토큰이 있으면 요청 헤더에 추가한다.
    if (accessToken && !isInvalidToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (accessToken && refreshToken && isInvalidToken) {
        config.data = {
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }
    }

    // console.log("엑시오스 세팅값");
    // console.log("엑시오스 요청",config.baseURL,config.url);
    console.log("엑시오스 요청",config);

    return config;
}, function (error) {
    console.log("--요청 실패--");
    console.log(error);
});

let isTokenRefreshing = false;
let refreshSubscribers = [];

function onTokenRefreshed(newToken) {
    refreshSubscribers.forEach(callback => callback(newToken));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

instance.interceptors.response.use(
    response => response,
    async error => {
        const {config, response} = error;
        if (response.status === 401 && !config._retry) {
            config._retry = true;

            if (!isTokenRefreshing) {
                isTokenRefreshing = true;
                isInvalidToken = true;

                try {
                    const response = await instance(
                       {
                           url: '/auth/token',
                           method: "POST",
                           refreshToken: localStorage.getItem('refreshToken')
                    }
                    );
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);
                    isInvalidToken = false;
                    isTokenRefreshing = false;
                    onTokenRefreshed(newAccessToken);
                } catch (err) {
                    console.log("토큰 재발급 실패, 리프레시 토큰 만료");
                    isTokenRefreshing = false;
                    localStorage.setItem("accessToken", "" );
                    window.location.href = "/login";

                    return Promise.reject(error);
                }
            }

            return new Promise((resolve) => {
                addRefreshSubscriber(newToken => {
                    config.headers['Authorization'] = `Bearer ${newToken}`;
                    resolve(instance(config));
                });
            });
        }
        return Promise.reject(error);
    }
);


export default instance;
