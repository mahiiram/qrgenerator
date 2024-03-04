import React, { useState } from 'react'

function Qrcode() {
  const [img,setImg] = useState("https://i.gifer.com/AxMq.gif")
  const [loading,setLoading] = useState(false)
  const [qrData,setQrData] = useState(null)
  const [size,setSize] = useState(null)
  async function generateQr(){
     setLoading(true)
     try {
         const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}×${size}&data=${encodeURIComponent(qrData)}`
         setImg(url)
     } catch (error) {
      console.error("error generating QR code", error)
     }finally{
      setLoading(false)
     }
  }
  function downloadQR(){
    fetch(img)
    .then((res)=>res.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob)
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.removeChild(link);
    }).catch((err)=>{
      console.log("Error in download Qr",err);
    })
  }
  return (
    <div className='app-container' >
      <h1>QR Generator</h1>
      {loading && <p>Please wait....</p>}
      {img && <img src={img} className='qr-image'/>} 
         <div >
          <label htmlFor='datainput'  className='input-label'>
             Data for QR Code
          </label>
          <input type='text' placeholder='Enter data for qr code'  id='datainput' onChange={(e)=>setQrData(e.target.value)}/>
          <label htmlFor='sizeinput' className='input-label'>
             Image size(e.g..150)
          </label>
          <input type='text'  id='sizeinput' placeholder='Enter Size for qr code' onChange={(e)=>setSize(e.target.value)}/>
          <button className='generate-button' onClick={generateQr} disabled={loading}>Generate</button>
          <button className='download-button' onClick={downloadQR}>Download</button>
          </div>  
    </div>
  )
}

export default Qrcode