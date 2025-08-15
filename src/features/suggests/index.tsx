import { Main } from '@/components/layout/main'
import { SnsSuggest } from "./components/sns-suggest";

export default function Suggests() {

  return (
    <Main>
      <div className='mb-2 flex items-center justify-between space-y-'>
        <div className="w-full">
          <div className="grid grid-cols-[3%_40%_10%_28%_12%_8%] px-4">
            <div className="pl-0" style={{ fontFamily: "'LINE Seed JP', 'LINE Seed JP Bold', sans-serif", fontWeight: 700 }}>SNS</div>
            <div style={{ fontFamily: "'LINE Seed JP', 'LINE Seed JP Bold', sans-serif", fontWeight: 700 }}>投稿内容・キーワード</div>
            <div style={{ fontFamily: "'LINE Seed JP', 'LINE Seed JP Bold', sans-serif", fontWeight: 700 }}>ターゲット</div>
            <div style={{ fontFamily: "'LINE Seed JP', 'LINE Seed JP Bold', sans-serif", fontWeight: 700 }}>予測エンゲージメント</div>
            <div style={{ fontFamily: "'LINE Seed JP', 'LINE Seed JP Bold', sans-serif", fontWeight: 700 }}>アクション</div>
          </div>
        </div>
      </div>
      <SnsSuggest />
    </Main>
  );
}

