import { useEffect, useState } from 'react';

const Counter = ({ flag }) => {
  // hooks (before changes): [0]
  console.log('Counter(): was called');

  if (Math.random() < 0.5) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(0);
    console.log('[obabichev]', { value });
    const handleClick = () => {
      setValue((oldValue) => oldValue - 1);
    };

    return (
      <div style={{ display: flag ? 'none' : 'block' }}>
        <button onClick={handleClick}>{value}</button>
      </div>
    );
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [str, setStr] = useState('');
    console.log('[obabichev]', { str });

    return (
      <div style={{ display: flag ? 'none' : 'block' }}>
        <input value={str} onChange={(event) => setStr(event.target.value)} />
      </div>
    );
  }
};

const TestUseEffect = (id) => {
  console.log('TestUseEffect(): was called');
  const [value, setValue] = useState('');

  const valueToRetriggerUseEffect = value.toUpperCase();
  useEffect(() => {
    console.log('TestUseEffect:useEffect', valueToRetriggerUseEffect);

    return () => {
      console.log(
        'TestUseEffect:useEffect (was cleaned)',
        valueToRetriggerUseEffect
      );
    };
  }, [valueToRetriggerUseEffect]);

  return (
    <div>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  );
};

export const Test = () => {
  // hooks: [true]
  console.log('Test(): was called');
  const [flag, setFlag] = useState(true);

  return (
    <div>
      <button onClick={() => setFlag(!flag)}>trigger</button>
      {flag && <TestUseEffect />}
    </div>
  );
};
