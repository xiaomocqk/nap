> **nap** 可以避免因用户的多次操作导致的重复请求, 帮助你从繁忙的业务代码中解放出来

## Introduce

业务中经常有点击发送请求的需求, 而要禁止用户因多次点击而造成重复请求的问题, 一般是设置一个变量来控制. 但是这样的做法无疑是重复性的劳动, 甚至容易疏漏! **nap**就是为了解决这个问题, 下面看一下对比:

![Image text](https://raw.githubusercontent.com/xiaomocqk/images_folder/master/nap/code.png)

## Install

```sh
npm install git+https://github.com/xiaomocqk/nap.git --save
```

## Usage

nap 是一个函数，它需要接收一个内部返回`promise`对象的函数，如下面例子中的`reqUserInfo`。

nap 内部已经对请求结果进行了数据处理，返回一个数组，目的是为了对`async-await`进行错误处理，这样就可以不使用`try-catch`层包裹了。

```js
// request.js
export function reqUserInfo() {
  return axios('/api/user');
}
```

```js
// App.js
import React, { useState } from 'react';
import { reqUserInfo } from './request.js';

export default function App() {
  let [userInfo, setUserInfo] = useState({});

  return (
    <>
      <h1>{userInfo.name}</h1>
      <button onClick={onSubmit}>Submit</button>
    </>
  );

  async function onSubmit() {
    let [err, res] = await nap(reqUserInfo);

    if (err) {
      console.log(err);

      if (err === 'nap') console.log('重复的点击被nap拦截了!');

      return;
    }

    setUserInfo(res.data);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
