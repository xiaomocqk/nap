nap 是一个基于`promise`，专注于处理接口请求的 js 库，它的特点有：

1. 捕获因请求可能导致的报错，使得代码更为扁平（具体体现在使用了`async-await`语法）；
2. 支持对某个请求添加节流的功能，接口返回后解除锁定。可以有效避免因用户重复操作导致多次请求接口的问题；
3. `nap`返回一个状态为`resolved`等`promise`对象，且其结果为一个数组, 形如`[error, response]`；

## Install

```sh
npm install git+https://github.com/xiaomocqk/nap.git --save
```

## Usage

### \# 用法：**_nap( promise, signId )_**

nap 的第一个参数应是一个`promise`对象。

第二个参数`signId`是可选的，它可以起到节流的作用。它可以是任意值，只要第二次执`nap`时，其值严格等于第一次传入等值即可(当然不要使用`undefined/NaN`这样的值 😛)。

```js
// request.js

export function reqUserInfo() {
  // 没有做节流处理
  return nap(axios('/api/user'));
}

export function reqUpload() {
  // 做了节流处理，nap的第二个参数应为不变的、唯一的值
  return nap(axios('/api/upload'), reqUpload);
}
```

```js
// App.js
import React, { useState } from 'react';
import { reqUserInfo, reqUpload } from './request.js';

export default function App() {
  const [userInfo, setUserInfo] = useState({});

  return (
    <>
      <h1>{userInfo.name}</h1>
      <button onClick={onGetUserInfo}>Get User Info</button>
      <button onClick={onUpload}>Upload Files</button>
    </>
  );

  async function onGetUserInfo() {
    // 不再需要`try-catch`包裹`async-await`了，扁平化处理错误
    const [err, res] = await reqUserInfo();

    // 获取失败
    if (err) return;

    // 获取成功
    console.log('重复点击按钮试试，我都会发起请求！');
    setUserInfo(res.data);
  }

  async function onUpload() {
    const [err, res] = await reqUpload();

    if (err) {
      // 上传失败
      if (err === 'nap') return console.log('重复的点击被nap拦截了!');
      return console.log('上传失败：解除锁定');
    }

    // 上传成功
    console.log('上传成功：解除锁定');
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
