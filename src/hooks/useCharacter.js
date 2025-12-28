import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacher(query) {
  const [characters, setCharaters] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  useEffect(() => {
    const contorller = new AbortController();
    const signal = contorller.signal;
    async function FetcheData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharaters(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharaters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoding(false);
      }
    }
    // if (query.length < 3) {
    //   setCharaters([]);
    //   return;
    // }
    FetcheData();
    return () => {
      contorller.abort();
    };
  }, [query]);
  return { isLoding, characters };
}
