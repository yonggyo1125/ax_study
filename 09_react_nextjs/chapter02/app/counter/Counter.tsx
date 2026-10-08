'use client'; // CSR

import { useState } from 'react';

export default function Counter(): React.JSX.Element {
    const [number, setNumber] = useState<number>(0);

    return (
        <>
            <h1>{number}</h1>
            <button type="button" className="border">
                -1
            </button>
            <button type="button" className="border">
                +1
            </button>
        </>
    );
}
