import { useCallback, useEffect, useState } from "react";

const Test = () => {
  const [number, setNumber] = useState(0);

  // //함수도 객체이기 때문
  // const someFunc = () => {
  //   console.log(`someFunc number: ${number}`);
  //   return;
  // };

  const someFunc = useCallback(() => {
    console.log(`someFunc number: ${number}`);
    return;
  }, [number]);

  useEffect(() => {
    console.log("someFunc render");
  }, [someFunc]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
      <br />
      <button onClick={someFunc}>Call someFunc</button>
    </div>
  );
};

export default Test;
