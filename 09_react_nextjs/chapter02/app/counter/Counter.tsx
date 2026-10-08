'use client'; // CSR

import { useState } from 'react';

export default function Counter(): React.JSX.Element {
    const [number, setNumber] = useState<number>(0);

    // function increase() {
    //     setNumber(number + 1);
    // }

    // function decrease() {
    //     setNumber(number - 1);
    // }

    let count = 0;
    const increase = () => {
        count++;

        console.log('count', count);

        setNumber(number + 1);
    };
    // const decrease = () => setNumber(number - 1);

    return (
        <>
            <h1>{number}</h1>
            <button type="button" className="border" onClick={increase}>
                +1
            </button>
            <button
                type="button"
                className="border"
                onClick={() => setNumber(number - 1)}
            >
                -1
            </button>
        </>
    );
}
