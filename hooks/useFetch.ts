import { useEffect, useState } from "react";
import axios from "axios";


function useFetch(url: string) {
  const [fetchData, setFetchData] = useState(null) // we set it to null since we don't know what type of data we will receive

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true) //loading set true when the request started
    axios.get(url).then((response) => {
      setFetchData(response.data);
    }).catch((error) => {
      setError(error)
    }).finally(() => {
      setLoading(false) //set loading to false when the request finished
    });

  }, [url]); //dependency array will be url since we just wanna make new request only when the url changes


  return { fetchData, loading, error } // we return the state and data we fetched
}
export default useFetch;