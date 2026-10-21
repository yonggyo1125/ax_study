'use client';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import TiptabEditor from '@/shared/components/TiptabEditor';

export default function TodoForm() {
    return (
        <div>
            <form noValidate autoComplete="off">
                <div className="flex mb-2 items-center">
                    <label className="basis-30 shrink-0">할일</label>
                    <div className="grow">
                        <Input
                            type="text"
                            name="title"
                            placeholder="할일을 입력하세요..."
                        />
                    </div>
                </div>

                <div className="flex mb-2 items-center">
                    <label className="basis-30 shrink-0">내용</label>
                    <div className="grow">
                        <TiptabEditor />
                    </div>
                </div>
                <Button type="submit">등록하기</Button>
            </form>
        </div>
    );
}
