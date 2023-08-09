import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserConext";

const useApiGet = (path) => {

    const [data, setData] = useState([]);
    const { SERVER_ADDRESS, token,updateLoginStatus } = useContext(UserContext);
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {

        // fetch(`${SERVER_ADDRESS}${path}`,{
        //     method: "GET",
        //     headers:{
        //         authorization : `Bearer ${token}`
        //     }
        // })
        // .then(res => {
        //     if(res.status === 200) return res.json();
        //     throw new Error(res.message)
        // })
        // .then(data => {
        //     setData(data);
        //     console.log(data);
        // })
        // .catch(err => console.log(err.message))

        axios.get(`${SERVER_ADDRESS}${path}`, config)
            .then(response => setData(response.data.data))
            .catch(err => {
                console.log(err.response.data.logOut)
                if(err.response.data.logOut === true){
                    updateLoginStatus(true)
                }
            })

        return () => {
            setData([])
        }
    }, []);
    return [data]
}

const useApiPost = (path, body) => {
    const [data, setData] = useState([]);
    const { SERVER_ADDRESS, token, updateLoginStatus } = useContext(UserContext);
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.post(`${SERVER_ADDRESS}${path}`, body, config)
            .then(response => setData(response.data.data))
            .catch(err => {
                console.log(err.response.data.logOut)
                if(err.response.data.logOut === true){
                    updateLoginStatus(true)
                }
            })

    })
}


export {
    useApiGet
}