'use strict';

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  const words = [
    'red',
    'blue',
    'pink',
  ];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const target = document.getElementById('target');
  
  // クリックするとスタートし、同時にタイムを図るようにする設定
  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  // 入力した文字が正しいかを表示するコード
  document.addEventListener('keydown', e => {
    // 不正解の場合リターンとする(早期リターンまたはｱｰﾘｰﾘﾀｰﾝというテクニック)
    if (e.key !== word[loc]) {
      return;
    }

    loc++;

    // 1: _ed
    // 2: __d
    // 3: ___
    target.textContent = '_'.repeat(loc) + word.substring(loc);

    // 次の単語に行くように設定＆終了文字表示設定
    if (loc === word.length) {
      if (words.length === 0) { // 全てのワードの入力が終わると終了文字が表示される設定
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2); // 最後の単語入力後に経過時間を表示する
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} seconds!`; // 終了時に表示される文字
        return;
      }

      setWord();
    }
  });
}