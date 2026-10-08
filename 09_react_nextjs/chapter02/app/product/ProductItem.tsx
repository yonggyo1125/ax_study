interface Product {
    itemName: string;
    itemPrice: number;
}
import Badge from './Badge';

export default function ProductItem(props: Product): React.JSX.Element {
    //props.itemName = "갤럭시S 26";
    console.log(Object.getOwnPropertyDescriptors(props));
    const { itemName, itemPrice } = props;
    return (
        <>
            <dl>
                <dt>상품명</dt>
                <dd>
                    <Badge theme="dark">할인상품</Badge>
                    {itemName}
                </dd>
            </dl>
            <dl>
                <dt>판매가</dt>
                <dd>{itemPrice}</dd>
            </dl>
        </>
    );
}
