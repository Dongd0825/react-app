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

    // 大文件切片上传 断点续传 [固有大小 && 固有数量]
    let max = 1024 * 100,
        count = Math.ceil(file.size / max),
        chunks = [];

    if (count > 100) {
      max = file.size / 100;
      count = 100;
    }

    const HASH = await changeBuffer(file);
    const suffix = /\.([a-zA-Z]+)/.exec(file.name)[1];
    for(let i = 0; i < count; i++) {
      chunks.push({
        file: file.slice(max * i, max * (i + 1)),
        filename: `${HASH}_${i + 1}.${suffix}`
      })
    }
    let readyList = [];

    const data = await axios.post('http://127.0.0.1:9009/upload_already', qs.stringify({
      HASH
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      } 
    })
    readyList = data.fileList;

    let index = 0;
    function complete () {
      index++;
      setProcess(`${index/count * 100}%`);
      if (index < count) return;
      setProcess('100%');
      axios.post('http://127.0.0.1:9009/upload_already', qs.stringify({
        HASH,
        count
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        } 
      }).then((res) => {
        if (res.data.code === 0) {
        }
      })
    }
    chunks.forEach((_chunk) => {
      if (readyList && readyList.includes(_chunk.filename)) {
        return;
      }
      const formData = new FormData();
      formData.append('file', _chunk.file);
      formData.append('filename', _chunk.filename)
      axios.post('http://127.0.0.1:9009/upload_chunk', formData, {
        headers: {
          'Content-Type':"multipart/form-data"
        }
      }).then((res) => {
        if (res.data.code === 0) {
          complete();
        }
      })
    })
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

