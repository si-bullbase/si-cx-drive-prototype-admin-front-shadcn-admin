import { Main } from '@/components/layout/main'
import { SnsSuggest } from "./components/sns-suggest";

export default function Suggests() {

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
      <SnsSuggest />
    </Main>
  );
}

