// import Counter2 from './components/Counter';

// import Counter2, { counterVar as Counter3, counterVar2 } from './components/Counter';
import React from 'react'; // node_modules/react/index.js
import { type Product } from '@/app/components/Counter';

import Counter2, { counterVar as Counter3, counterVar2 } from '@/app/components/Counter';
console.log("counterVar:", Counter3);

export default function Home() {
    return <Counter2 />;
}
