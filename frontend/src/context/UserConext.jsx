import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserContext = createContext({});

function UserContextProvider({ children }) {

    const [login, setLogin] = useState(localStorage.getItem("lgs") === 'true' ? true : false);
    let userData = {
        userID: localStorage.getItem("userID") || "000",
        email: localStorage.getItem("email") || "unknown",
        name: localStorage.getItem("name") || "unknown",
    };
    let tkn = localStorage.getItem("tkn");
    // console.log(tkn)
    const [cartData, setCartData] = useState(localStorage.getItem("cartData") !== null ? JSON.parse(localStorage.getItem("cartData")) : []);
    // console.log(cartData)
    // console.log(localStorage.getItem('cartData'))


    const value = {
        SERVER_ADDRESS: import.meta.env.VITE_SERVER_URL,
        userData: userData,
        updateUserData: (data) => {
            const { userID, email, name } = data;
            localStorage.setItem("userID", userID);
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
            userData = {
                UserID: userID,
                email: email,
                name: name
            }

        },
        token: tkn,
        updateToken: (data) => {
            const { token } = data
            localStorage.setItem("tkn", token);
            tkn = token;
        },
        loginStatus: login,
        updateLoginStatus: (boolean) => {
            if (boolean === true) {
                setLogin(false);
                localStorage.setItem("lgs", false);
            }
            else {
                setLogin(true);
                localStorage.setItem("lgs", true);
            }
        },
        cartData: cartData,
        addToCart: (producData) => {

            let existingData = JSON.parse(localStorage.getItem('cartData'));
            let newData = []
            if (existingData === null) {
                newData.push(producData)
            }
            else {
                newData = [
                    ...existingData,
                    producData
                ]
            }
            localStorage.setItem('cartData', JSON.stringify(newData))
            setCartData(JSON.parse(localStorage.getItem('cartData')))
        },
        removeFromCart: (producData) => {
            let data = [];
            let flag = true
            for (let item of cartData) {
                if (item.productID === producData.productID && flag == true) {
                    flag = false;
                    continue;
                }
                data.push(item);
            }
            localStorage.setItem('cartData', JSON.stringify(data))
            setCartData(data);
        }
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
}
