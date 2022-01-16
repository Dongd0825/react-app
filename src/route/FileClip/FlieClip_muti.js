import React, { useState } from 'react';
import axios from 'axios';
import * as styles from './FileClip1.module.scss';
import qs from 'qs';

const FlieClip = () => {
  const inputRef = React.useRef();
  const [fileArr, setFileArr] = useState([]);

  const handleClick = () => {
    inputRef.current.click();
  }

  const postRequest = (url, data, config) => {
    return axios.post(url,data, config).then((res) => {
      console.log({res});
    })
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

  const delay = (delay = 1000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve()
      }, delay)
    })
  }

  const onChange = async () => {
    if (!inputRef.current.files.length) return;
    const file = inputRef.current.files;

    if (file.length <= 0) {
      return;
    }

    const fileArray = Array.from(file);
    const uploadList = [];
    
    fileArray.forEach(async (_file, i) => {
      uploadList[i] = {
        file: _file,
        base64: null,
        progress: null,
      }
    })

    const base64List = 
      await Promise.all(fileArray.map((_file) => readFile(_file)));
    base64List && setFileArr(uploadList);

    uploadList.forEach(async (_file) => {
      const res = await postRequest('/', qs.stringify({
        chunk: _file,
        filename: _file.filename
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        onUploadProgress: (en) => {
          _file.progress = en.loaded / en.total * 100 + '%';
        }
      })

      if (res.code === 200) {
         // 移除mark 和 progress
        _file.progress = '100%'
      }
    })
  }

  const onDrop = (e) => {
    e.preventDefault();
    console.log({e}, e.dataTransfer.files[0])
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={onChange}/>
      <button onClick={handleClick} contenteditable="true" onDrop={onDrop}>upload</button>
      {
        fileArr.map((file) => (
          file.progress === '100%' ?
          <div>
            <img src={file.base64}/>
            <div className={styles.card}>
              {file.progress}
            </div>
            <div className={styles.mark}></div>
          </div> : null
        ))
      }
    </div>
  )
}

export default FlieClip;

