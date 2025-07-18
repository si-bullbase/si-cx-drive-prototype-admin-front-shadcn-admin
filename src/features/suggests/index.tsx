import { useState } from "react";

import { Main } from '@/components/layout/main'
import { SnsSuggest } from "./components/sns-suggest";
import { getSuggestsWithPagination } from "./data/suggests";
import { SuggestsPagination } from "./components/suggests-pagination";

export default function Suggests() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, pagination } = getSuggestsWithPagination(page, pageSize);

  return (
    <Main>
      <div className='mb-2 flex items-center justify-between space-y-'>
        <div className="w-full">
          <div className="grid grid-cols-[4%_36%_12%_20%_16%_20%]  px-4">
            <div className="font-medium pl-">SNS</div>
            <div className="font-medium">投稿内容・キーワード</div>
            <div className="font-medium">ターゲット</div>
            <div className="font-medium">予測エンゲージメント</div>
            <div className="font-medium">アクション</div>
          </div>
        </div>
      </div>
      {data.map((suggest) => (
        <SnsSuggest key={suggest.id} {...suggest} />
      ))}
      <div className="mt-4">
        <SuggestsPagination
          pagination={pagination}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </div>
    </Main>
  );
}

