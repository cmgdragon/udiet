import React, { useState } from 'react';


const App = () => {

  const [valor, valorUpdate] = useState(0)

  return (
  <h1 onClick={() => valorUpdate(valor + 1)} >{`I have ${valor} item(s)`}</h1>
  )

}


export default App;
