> 作用：避免在业务中因用户的多次点击导致的重复请求, 帮助你从繁忙的业务代码中解放出来

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

export default function App(){
  let [userInfo, setUserInfo] = useState('');

  return (
    <>
      <h1>{userInfo.name}</h1>
      <button onClick={onClick}>Click me</button>
    </>
  );

  async function onClick(){
    let [err, res] = await getUserInfo();

    if (err) {
      console.log(err);
      return;
    }

    setUserInfo(res.data);
  }
}

ReactDOM.render(<App />, document.getElementById('#root'));
```