import logo from './hack_logo.png';
import './style.css';
import axios from 'axios';
import './App.css';

import {useState, useEffect} from 'react';


function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const getCount = async () => {
    await axios.get('/cnt', { withCredentials: true})
      .then((res) => {
        console.log(res);
        setCount(res.data.data);
      }).catch((err) => {
        console.error(err);
      })
  }

  const changeText = () => {

    if(count/10 >= 5) {
      
      sendMsg();
    }
  }

  const sendMsg =  () => {
     axios.get('/msg', {withCredentials: true})
      .then((res) => {
        console.log(res);
        setTimeout(() => 10000000);
      })
      .catch((err) => {
        console.error(err);
      })
  }



  useEffect(() => {
    getCount();
    changeText();
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }, [])

  return (
    <div className="App">
       <div class="header">
        <ul class="Header_ul">
            <li class="Header_li">
                <div class="Logo_box">
                    <img src={logo} alt=" logo" class="logo_img" />
                </div>
            </li>
            <li class="Header_li"></li>
            <li class="Header_li"></li>
            <li class="Header_li"></li>
        </ul>
    </div>

    <div class="container">
        <h3 class="title">AIPS - 인공지능 거리질서 지킴이</h3>

        <div class="InterText">
            <div class="Box1">
                <i class="fa fa-users icons"></i>
                <p class="Name">감지된 사람 수</p>
                <div class="DataNum" id="Gun">{count}</div>
            </div>
            <div class="Box2">
                <i class="fa-solid fa-camera icons"></i>
                <p class="Name">카메라 시점 넓이</p>
                <input type="text" id="Wid" placeholder="m²" value="10" />
            </div>

            <div class="Box2">
                <i class="fa fa-chart-simple icons"></i>
                <p class="Name">군중밀집도</p>
                <div class="DataNum" id="Gun2">{count / 10}</div>
            </div>
        </div>


        <div class="Gun">
            <div class="grape">
                <div class="sp1 bg-success">
                    <p class="StatNum">0.0</p>
                    <p class="StatNum">2.0</p>
                </div>
                <div class="sp2 bg-warning">
                    <p class="StatNum">4.0</p>
                </div>
                <div class="sp3 bg-danger">
                    <p class="StatNum">5.0</p>
                </div>
            </div>
            <div class="grape">
                <p>안전</p>
                <p>경고</p>
                <p>위험</p>
            </div>
        </div>
    </div>

    </div>
  );
}

export default App;
