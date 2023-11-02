import React, { useEffect, useState } from 'react'
let instilize = {
  img: "",
  name: "",
  price: "",
  catagary: ""
}
const Prodcuts = () => {

  let [prodobj, setProdobj] = useState(instilize)
  let [prodarr, setProdarr] = useState(JSON.parse(localStorage.getItem("ProdcutList")) || [])
  let [upid,setUpid]=useState(-1)

  const HandelInput = (e) => {
    let { name, value } = e.target
    setProdobj((old) => ({ ...old, [name]: value }))
  }

  const HandelSubmit = (e) => {
    e.preventDefault();
    if(upid<0){
      setProdarr([...prodarr, prodobj])
    }
    else{
      // setProdarr(prodarr[upid]==prodobj)
      let data=[...prodarr]
      console.log(data);
      data[upid]=prodobj
      setProdarr(data)
      // console.log(prodarr[upid])
      // console.log(prodarr);
    }
  }
  useEffect(() => {
    localStorage.setItem("ProdcutList", JSON.stringify(prodarr))
  }, [prodarr])

  const HandelDelet=(i)=>{
    let data=prodarr.filter((ele,index)=>index !=i)
    setProdarr(data)
  }
  
  const HandelUpdate=(i)=>{
    setUpid(i)
    setProdobj(prodarr[i])
  }

  return (
    <>
      <form onSubmit={HandelSubmit}>
        <input type="text" placeholder='prodcut title' onChange={HandelInput} value={prodobj.name } name='name' />
        <input type="url" placeholder='prodcut img' onChange={HandelInput} value={prodobj.img} name="img" />
        <input type="number" placeholder='product price' onChange={HandelInput} value={prodobj.price} name="price" />
        <input type="text" placeholder='prodcut catagary' onChange={HandelInput} value={prodobj.catagary} name='catagary' />
        <input type="submit"  value={upid<0?"submit":"update"}/>
      </form>
      {
        prodarr.map((pro,index) => {
          return <>
            <div>
              <img src={pro.img} alt={pro.name} />
              <h1>{pro.name}</h1>
              <h3>{pro.price}</h3>
              <span>{pro.catagary}</span>
              <button onClick={()=>HandelDelet(index)}>delet</button>
              <button onClick={()=>HandelUpdate(index)}>update</button>
            </div>
          </>
        })
      }
    </>
  )
}

export default Prodcuts