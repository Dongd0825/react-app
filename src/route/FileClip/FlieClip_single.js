import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import SparkMD5 from 'spark-md5';

// TODO 补充交互样式， 上传文件时候，不能再次上传
// node 服务
const FlieClip = () => {
  const inputRef = React.useRef();
  const [imgUrl, setImgUlr] = useState('');
  const [process, setProcess] = useState(0);

  const handleClick = () => {
    inputRef.current.click();
  }

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      try {
        reader.onload = (res) => {
          console.log({res});
          resolve(res.target.result); 
        }
      } catch(err) {
        reject(err);
      }
    })
  }

  const changeBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      try {
        reader.onload = (res) => {
          const buffer = res.target.result;
          const spark = new SparkMD5.ArrayBuffer(buffer);
          spark.append(file);
          const hash = spark.end();
          console.log({hash});
          resolve(hash); 
        }
      } catch(err) {
        reject(err);
      }
    })
  }

  const postRequest = (url, data, config) => {
    return axios.post(url,data, config).then((res) => {
      console.log({res});
    })
  }

  

  const onChange = async () => {
    if (!inputRef.current.files.length) return;
    const file = inputRef.current.files[0];

    // if (file.size > 10000) {
    //   return
    // }

    // if (!/(png|jpg|jpeg|gif)/i.test(file.type)) {
    //   return
    // }

    // 第一种 base64
    // const base64 = await readFile(file);
    // setImgUlr(base64);
    // axios.post('http://127.0.0.1:9009/upload_single_base64',qs.stringify({
    //   filename: file.name,
    //   file: encodeURIComponent(base64)
    // }), {
    //   headers: {
    //     'Content-Type':"application/x-www-form-urlencolded"
    //   }
    // }).then((res) => {
    //   console.log({res});
    // })

    // 第二种 formdata
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('filename', file.filename)
    // postRequest('http://127.0.0.1:9009/upload_single', formData, {
    //   headers: {
    //     'Content-Type':"multipart/form-data"
    //   }
    // }).then((res) => {
    //   console.log({res});
    // })
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" style={{display:'none'}} onChange={onChange}/>
      <button onClick={handleClick}>upload</button>
      <img src={imgUrl}/>
      {process}
    </div>
  )
}

export default FlieClip;

