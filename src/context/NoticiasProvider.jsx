import axios from "axios";
import { createContext, useEffect, useState } from "react";

const NoticiasContext = createContext();

const NoticiasProvider = ({children}) => {
  const [categoria, setCategoria] = useState('general')
  const [noticias, setNoticias] = useState([])
  const [pagina, setPagina] = useState(1)
  const [totalNoticias, setTotalNoticias] = useState(0)

  const handleChangeCategoria = e => setCategoria(e.target.value)

  const handleChangePagina = (e, valor) => {
    setPagina(valor)
  }

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&pageSize=100&apiKey=${import.meta.env.VITE_API_KEY}`
      const {data} = await axios(url)
      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
      setPagina(1)
    }
    consultarAPI()
  }, [categoria])

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=mx&page=${pagina}&category=${categoria}&pageSize=100&apiKey=${import.meta.env.VITE_API_KEY}`
      const {data} = await axios(url)
      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
    }
    consultarAPI()
  }, [pagina])

  return (
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        handleChangePagina,
        pagina
      }}
    >
      {children}
    </NoticiasContext.Provider>
  )
}

export {
  NoticiasProvider
}

export default NoticiasContext