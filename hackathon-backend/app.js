const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors());


app.get('/cnt', (req, res, next) => {
  fs.readFile('people.txt', (err, data) => {
    if(err) {
      throw err;
    }
    let array = data.toString().split('\n');

    let last = array[0].trim('\r');
    console.log(last);
    res.status(200).json({
      success: true,
      data: last,
    });
  });
})

// Message: `[자동발신] AIPS : 안동대학교 #4 위치에서\n 
//     00시 00분 높은 인구밀집도로 인해\n
//     위험한 상황이 발생할 가능성이 매우 높습니다.\n
//     신속한 출동 바랍니다.\n`,

app.get('/msg', (req, res, next) => {
  let params = {
    
    PhoneNumber: '+82' + "01028736929",
    Message : '접수된 신고',
    MessageAttributes: {

      'AWS.SNS.SMS.SenderID': {
        'DataType': 'String',
        'StringValue': 'dddd'
      }
    }
  };

  let publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

  publishTextPromise
    .then((data) => {
      console.log(data);
      res.status(200).json({ messageId: data.MessageId })
    })
    .catch((error) => {
      res.status(400).json(JSON.stringify(error));
    })
})

app.listen(3001, () => {
  console.log('listening on http://localhost:3001');
})
