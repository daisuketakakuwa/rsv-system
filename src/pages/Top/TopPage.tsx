const TopPage = () => (
  <div style={{ padding: '20px' }}>
    <h2>イベント一覧</h2>
    <div style={{ display: 'flex' }}>
      <div
        style={{ width: '100%', padding: '10px', border: '3px solid gray', borderRadius: '7px' }}>
        <h3 style={{ margin: '5px 0px' }}>新NISA徹底解剖!!!初心者向けサロン</h3>
        <div style={{ width: '100%', border: '1px solid gray', margin: '10px 0px' }}></div>
        <p>
          2024年から新NISAがスタートしました。「これを機に新NISAで投資を始めてみよう！」と思ったものの、「どの金融機関で口座開設すればいいか分からない…」という人も多いのではないでしょうか？
          新NISAの口座は一人一口座しか作れないので、自分に合ったところを比較して選ぶべきです。そこでこの記事では、新NISAおすすめ口座とその理由を分かりやすく解説します。
        </p>
        <div style={{ margin: '5px 0px' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'white',
              backgroundColor: '#5f5f5f',
              padding: '0px 10px',
              border: '0px',
              borderRadius: '5px',
              marginRight: '5px',
            }}>
            開始時刻
          </span>
          2024年01月04日 12時30分
        </div>
        <div style={{ margin: '5px 0px' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'white',
              backgroundColor: '#5f5f5f',
              padding: '0px 10px',
              border: '0px',
              borderRadius: '5px',
              marginRight: '5px',
            }}>
            終了時刻
          </span>
          2024年01月04日 13時00分
        </div>
        <div style={{ margin: '5px 0px' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'white',
              backgroundColor: '#5f5f5f',
              padding: '0px 10px',
              border: '0px',
              borderRadius: '5px',
              marginRight: '5px',
              marginLeft: '32px',
            }}>
            定員
          </span>
          200 人
        </div>
      </div>
    </div>
  </div>
);

export default TopPage;
