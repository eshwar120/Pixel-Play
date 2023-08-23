import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserConext";

const useApiGet = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false) 
  const { SERVER_ADDRESS, token, updateLoginStatus } = useContext(UserContext);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  // console.log(SERVER_ADDRESS)

  useEffect(() => {
    setLoading(true);
    setError(false)
    axios
      .get(`${SERVER_ADDRESS}${path}`, config)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err.response.data.logOut);
        if (err.response.data.logOut === true) {
          updateLoginStatus(true);
        }
        setError(true);
        setLoading(false);
      });

    return () => {
      setData([]);
    };
  }, []);
  return {loading, data, error};
};

const useApiPost = (path, body) => {
  const [data, setData] = useState([]);
  const { SERVER_ADDRESS, token, updateLoginStatus } = useContext(UserContext);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .post(`${SERVER_ADDRESS}${path}`, body, config)
      .then((response) => setData(response.data.data))
      .catch((err) => {
        console.log(err.response.data.logOut);
        if (err.response.data.logOut === true) {
          updateLoginStatus(true);
        }
      });
  });
};

export { useApiGet };
