const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const SparkMD5 = require('spark-md5');

const app = express();
const PORT = 9009;
const HOST = 'http://127.0.0.1';
const HOSTNAME = `${HOST}:${PORT}`;

app.listen(PORT, () => {
  console.log(`the webserver is ready, listen to ${PORT}`)
  console.log(`you can visit ${HOSTNAME}`)
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.method === 'OPTIONS' ? res.send('Current server support cross domain requests!') : next();
});

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '1024mb'
}));

const delay = function (delay = 3000) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, delay)
    } catch(err) {
      reject(err);
    }
  })
}

/** 上传路径 */
const uploadDir = `${__dirname}/upload`
/** 上传文件插件 解析formdata */
const multiparty_upload = (req, auto) => {
  auto = auto || null;
  let config = {
    maxFieldsSize: 200 * 1024 * 1024
  }
  auto && (config.uploadDir = uploadDir);
  return new Promise(async (resolve, reject) => {
    await delay();
    new multiparty.Form(config)
      .parse(req, (err, fields, files) => {
        if(err) {
          reject(err);
          return;
        } else {
          resolve({
            fields,
            files
          })
        }
      })
  })
}

app.post('/upload_single', async(req, res) => {
  try {
    const {fields, files} = await multiparty_upload(req, true);
    let file = (files.file && files.file[0]) || {}
    res.send({
      code: 0,
      codeText: 'success',
      originalFileName: file.originalFileName,
      servicePath: file.path.replace(__dirname, HOSTNAME)
    })
  } catch(err) {
    res.send({
      code: 1,
      codeText: err
    })
  }
})

function exsitFile(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.R_OK, err => {
      if (err) {
        console.log('err', err)
        resolve(false);
      }
      resolve(true);
    })
  })
}

function writeFile(res, path, file, filename, stream) {
  return new Promise((resolve, reject) => {
    if (stream) {

    }
    console.log('wrieteFile', path)
    fs.writeFile(path, file.toString(), err => {
      if (err) {
        reject(err);
        res.send({
          code: 1,
          codeText: 'error'
        })
        return;
      } 
      res.send({
        code: 0,
        codeText: 'success',
        originalFileName: filename,
        servicePath: file.path.replace(__dirname, HOSTNAME)
      })
      resolve();
    });
  })
}

app.post('/upload_single_base64', async(req, res) => {
  try {
    let file = req.body.file,
        filename = req.body.filename,
        spark = new SparkMD5.ArrayBuffer(),
        suffix = filename.match(/\.([a-zA-Z0-9]+)$/)[1],
        isExist = false;
    file = decodeURIComponent(file);
    file = file.replace(/^data:image\/\w+; base64/,"");
    file = Buffer.from(file, 'base64');
    spark.append(file);
    path = `${uploadDir}/${spark.end()}.${suffix}`;
    isExist = await exsitFile(path);
    if (isExist) {
      res.send({
        code: 0,
        codeText: 'success',
        originalFileName: file.originalFileName,
        servicePath: file.path.replace(__dirname, HOSTNAME)
      });
      return;
    }
    writeFile(res, path, file, filename, false);

  } catch(err) {
    res.send({
      code: 1,
      codeText: err
    })
  }
});

/** 切片上传 */
app.post('/upload_chunk', async (req, res) => {
  try {
    const { fields, files } = await multiparty_upload(req, true);
    let file = (files.file && files.file[0]) || {},
        filename = (fields.filename && fields.filename[0]) || ''; // HASH_1.png
        path = '',
        isExist = false;
    const HASH = filename.match(/^([a-zA-Z0-9]+)_(\d+)/)[1];
    // 上传临时目录
    path = `${uploadDir}/${HASH}`;
    !fs.existsSync(path) ? fs.mkdirSync(path) : null;
    // 把切片存储到临时目录中
    path =`${uploadDir}/${HASH}/${filename}`;
    isExist = await exsitFile(path);
    if (isExist) {
      res.send({
        code: 0,
        codeText: 'success',
        originalFileName: filename,
        servicePath: file.path.replace(__dirname, HOSTNAME)
      })
      return;
    }
    writeFile(res, path, file, filename, false)
  } catch(err) {
    res.send({
      code: 1,
      codeText: err
    })
  }
});

// 大文件上传 合并文件
function merge(HASH, count) {
  return new Promise((resolve, reject) => {
    const path = `${uploadDir}/${HASH}`;
    if (!fs.existsSync(path)) {
      reject('不存在此文件')
    }
    const fileList = fs.readdirSync(path);
    if (fileList.length < count) {
      reject('文件没有全部上传成功');
      return;
    }

    let suffix;
    fileList.sort((a, b) => {
      let reg = /_(\d+)\.(.*)$/;
      return a.match(reg)[1] - b.match(reg)[1] 
    }).forEach(_file => {
      !suffix ? (suffix = /\.([a-zA-Z0-9]+)/.exec(_file)[1]) : null;
      fs.appendFileSync(`${uploadDir}/${HASH}.${suffix}`, fs.readFileSync(`${path}/${_file}`));
      fs.unlinkSync(`${path}/${_file}`);
    })
    fs.rmdirSync(path);
    resolve({
      filename: `${HASH}.${suffix}`,
      path: `${uploadDir}/${HASH}.${suffix}`
    })
  })
}

/** 合并文件 */
app.post('/upload_merge', async (req, res) => {
  let {
    HASH,
    count
  } = req.body;
  const { filename, path } = await merge(HASH, count);
  if (filename) {
    res.send({
      code: 0,
      codeText: 'success',
      originalFileName: filename,
      servicePath: path.replace(__dirname, HOSTNAME)
    })
  }
});

app.post('/upload_already', (req, res) => {
  const {
    HASH
  } = req.query;
  let path = `${uploadDir}/${HASH}`
      fileList = [];

  try {
    if(fs.existsSync(path)) {
      fileList = fs.readdirSync(path);
      fileList = fileList.sort((a, b) => {
        let reg = /_(\d+)\.(.*)/
        return reg.exec(a)[1] - reg.exec(b)[1]
      })
      res.send({
        code: 0,
        codeText: 'success',
        fileList: fileList,
      });
    } else {
      res.send({
        code: 0,
        codeText: 'success',
        fileList: [],
      });
    }
    
  } catch(err) {
    res.send({
      code: 1,
      codeText: err,
    });
  }
})