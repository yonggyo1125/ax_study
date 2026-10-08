interface Product {
    itemName: string;
    itemPrice: number;
}

export default function ProductItem({itemName, itemPrice}: Product): React.JSX.Element {
    // const { itemName, itemPrice } = props;
    return (
        <>
            <dl>
                <dt>상품명</dt>
                <dd>{itemName}</dd>
            </dl>
            <dl>
                <dt>판매가</dt>
                <dd>{itemPrice}</dd>
            </dl>
        </>
    );
}
