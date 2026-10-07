import ProductItem from "./ProductItem";

export default function ProductPage(): React.JSX.Element {
    return <ProductItem item-name="아이폰" item-price={10000} />;
}

// import { Fragment } from "react";

// export default function ProductPage(): React.JSX.Element {
//     const itemName = '아이폰 18';
//     const itemPrice = 10000;
//     const isSolidOut = true;

//     const styles = {
//         backgroundColor: "skyblue",
//         height: "2rem"
//     }
//     return (
//         <>
//             {// 한줄 주석
//             }
//             <dl // 주석...
//             >
//                 <dt style={{backgroundColor: "black", color: "orange"}}>상품명</dt>
//                 <dd>{itemName}</dd>
//             </dl>
//             {/* {isSolidOut ? <div>품절!!</div>: ""} */}
//             {isSolidOut && <div>품절!!</div>}
//             <dl style={styles}>
//                 <dt>판매가</dt>
//                 <dd>{itemPrice}</dd>
//             </dl>
//         </>
//     );
// }
