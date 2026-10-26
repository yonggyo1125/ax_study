export const instant = false;

interface ParamsProp {
    id?: number;
}

interface SearchProp {
    keyword?: string;
    search_opt?: string;
}

export default async function BoardPage({
    params,
    searchParams,
}: {
    params: ParamsProp;
    searchParams: SearchProp;
}) {
    const pathVars = await params;

    console.log('pathVars:', pathVars);

    const searchVars = await searchParams;
    console.log('searchVars:', searchVars);

    return (
        <form method="post" action="/board">
            제목: <input type="text" name="subject" className="border" />
            <br />
            내용: <textarea name="content" className="border"></textarea>
            <br />
            <button type="submit">작성하기</button>
        </form>
    );
}
