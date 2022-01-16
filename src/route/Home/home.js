import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import PostList from '../../components/PostList';
import Post from '../../components/Post';
// import PSD from 'psd.js';
import * as styles from './home.module.scss';
// let PSD = require('psd');
const Home = (props) => {
    // const { match, location} = props;
    let counter = 0;
    function parsePsd(psd) {
      var node;
      var PsdW = psd.image.width();
      var PsdH = psd.image.height();
      console.time("parse");
      psd.tree().descendants().map(function (elem, i) {
        node = elem;
        draw(node);
      });
      console.timeEnd("parse");

      function getMask() {
        if ( /*image.hasMask&&*/ node.layer.mask.width /*>0*/ && node.layer.mask.height /*>0*/ ) {
          var StartPos = node.layer.image.startPos;
          var EndPos;
          var inf = node.get("channelsInfo");
          for (var i = 0; i < inf.length; i++) {
            var elem = inf[i];
            if (elem.id == -2) { //-2 mask channel
              EndPos = StartPos + elem.length;
              break;
            } else {
              StartPos = StartPos + elem.length;
            }
          }
          return psd.file.data.slice(StartPos, EndPos);
        } else {
          console.error("oops, it seems there is no mask");
          return false;
        }
      }

      function parseMask(mask) {
        if (mask instanceof Uint8Array /*||Array.isArray(mask)*/ ) {} else {
          console.error("No array received");
          return false;
        }
        var МaskData = [];
        var ModeRAW = 0;
        var NotUseful = node.layer.mask.height * 2 + 2;
        if (mask[1] == 1) { //RLE
          for (var i = NotUseful; i < mask.length; i++) {
            var elem = mask[i];
            if (ModeRAW === 0) {
              //if(mask[i+1]===undefined)console.error("No next character!");
              if (elem < 128) { // 128?
                ModeRAW = +elem + 1; //Enable modeRAW to elem+1  
              } else {
                var Repeat = 257 - elem; //257 
                var Color = mask[i + 1];
                var r = 0;
                while (r < Repeat) { //Duplicate characters
                  МaskData.push(0, 0, 0, Color);
                  r++;
                }
                i++; //skip next step
              }
            } else { //ModeRAW  
              МaskData.push(0, 0, 0, elem);
              ModeRAW--;
            }
          }
        } else if (mask[1] === 0) { //RAW
          МaskData = mask.join(',0,0,0,').slice(10).split(','); //bad
        } else { //zip?
          console.error("oops", mask[0], mask[1]);
        }
        return МaskData;
      }

      function draw(n) {
        var node = n;
        if (node.layer.mask.defaultColor === undefined) {
          // console.info(node.name,"- маски нет");
          return false;
        }
        var MaskW = node.layer.mask.width;
        var MaskH = node.layer.mask.height;
        var MaskT = node.layer.mask.top;
        var MaskL = node.layer.mask.left;
        var MaskC = node.get("mask").defaultColor;
        counter++;
        var newC = document.createElement("canvas");
        newC.id = "L" + counter;
        newC.setAttribute("data-name", node.name);
        document.getElementById('psd').appendChild(newC);
        var elem = document.getElementById("L" + counter);
        var ctx = elem.getContext('2d');
        elem.width = PsdW;
        elem.height = PsdH;
        if (MaskC !== 0) {
          ctx.fillRect(0, 0, PsdW, PsdH);
        }
        if (MaskW !== 0 && MaskH !== 0) {
          var checkMask = parseMask(getMask());
          if (checkMask) {
            var MaskImage = ctx.createImageData(MaskW, MaskH);
            if (MaskImage.data.set) {
              MaskImage.data.set(checkMask);
            } else {
              checkMask.forEach(function (val, i) {
                MaskImage.data[i] = val;
              });
            }
            ctx.putImageData(MaskImage, MaskL, MaskT);
          } else {
            console.error("oops");
          }
        }
      }
    }
    useEffect(() => {
      var $upload = document.querySelector('.upload'),
            $file = document.querySelector('.file');

        $file.addEventListener('change', function(e) {
          const file = e.target.files[0];
          e.target.value = '';
          var url = URL.createObjectURL(file);
          // PSD.fromURL(url).then(function (psd) {
          //   console.log(psd.tree().export())
          //   var data = JSON.stringify(psd.tree().export(), undefined, 2);
          //   // console.log({data})
          //   document.getElementById('data').innerHTML = data;
          //   document.getElementById('image').appendChild(psd.image.toPng());
          //   const node = psd.tree().descendants()[0]
          //   console.log(node.get('矩形 1').export())
          //   // console.log(psd.tree().descendants()[0]);
          //   // parsePsd(psd);
          // });
        });
        $upload.addEventListener('click', function() {
          $file.click();
        });
    })
    return (
        <div>
            home
            {/* header
            <div className="upload">
              <input type="file" className="file" name=""/>
              点击添加或拖放PSD文件
            </div>
            <div id="image"></div>
            <div id="data" className={styles.pre}></div> */}
            
            {/* <Route
                path={match.url}
                exact
                component={PostList}
                >
            </Route>
            <Route
                path={`${match.url}:id`}
                render={props => <Post {...props}></Post>}>
            </Route> */}
        </div>
    )
}

export default Home;