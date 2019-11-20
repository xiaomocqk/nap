> **nap** 可以避免因用户的多次操作导致的重复请求, 帮助你从繁忙的业务代码中解放出来

## Introduce
业务中经常有点击发送请求的需求, 而要禁止用户因多次点击而造成重复请求的问题, 一般是设置一个变量来控制. 但是这样的做法无疑是重复性的劳动, 甚至容易疏漏! **nap**就是为了解决这个问题, 下面看一下对比:

![Image text](https://raw.githubusercontent.com/xiaomocqk/images_folder/master/nap/code.png)

## Install
```sh
npm install git+https://github.com/xiaomocqk/nap.git --save
```

## Usage
```js
// service.js
import nap from 'nap';

export function getUserInfo(){
  return nap(getUserInfo, () => fetch('/api/user'));
}
```

```js
// App.js
import React, { useState } from 'react'
import { getUserInfo } from './service.js';

export default function App() {
  let [userInfo, setUserInfo] = useState(Object.create(null));

  return (
    <>
      <h1>{userInfo.name}</h1>
      <button onClick={onClick}>Click me</button>
    </>
  );

  async function onClick() {
    let [err, res] = await getUserInfo();

    if (err) {
      console.log(err);
      return;
    }

    setUserInfo(res.data);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```