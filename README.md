## No spoilers twitter!!!

https://user-images.githubusercontent.com/80461281/192424647-f8eb1d4c-3f07-4463-89f0-f2e8cd4540e9.mp4

### アプリの概要

「ハックツハッカソン-プテラカップ（9/20~22）」で作ったTwitterのワードミュートをワンクリックでオン/オフできるアプリです。   

### URL

https://no-spoilers-twitter.vercel.app/

### 背景
Twitterの設定から指定した単語をミュートすることができますが、実際に使ってみたところ以下の点についてかなり使いずらいと感じました。   

- **Twitterのミュート機能の欠点**

  <dl>
    <dt>指定した単語のみしかミュートすることができない</dt>
    <dd>例：「ワンピース」を追加すると、ワンピースはミュートできるけれど「RED」、「シャンクス」などはその都度追加する必要がある。</dd>
    <dt>履歴を残すことができない</dt>
    <dd>ミュートにした単語は解除されるとリストから完全に消えるため、同じワードをミュートしたい場合はもう一度フォームから入力する必要がある。</dd>
  </dl>

そこで、私たちは携帯のアラームアプリを参考にしてもっと使いやすいミュート機能の実装を行いました。「No Spoilers Twitter!!!」では以下に示すようなことができます。

- **このアプリでできること**

  <dl>
    <dt>グループ化された単語をワンクリックでミュートすることができる</dt>
    <dd>ユーザーはミュートにしたい要素を複数選択してひとつのグループとして追加することができます。これによって、ワンクリックで複数のワードをまとめてミュートすることができます。   
      <div align="center">
        <img src="https://user-images.githubusercontent.com/80461281/192426112-19cd4b2e-362c-4590-9974-e1e2bd822bca.JPG" width="450px" />
      </div>
    </dd>
    <dt>履歴を残すことができる</dt>
    <dd>ユーザーが作成したミュートワードを解除しても消されることはなく、履歴に残すことができます。これによって、過去に追加したミュートグループを再度入力することなくミュートすることが できます。   
      <div align="center">
        <img src="https://user-images.githubusercontent.com/80461281/192426584-48d3677d-2cdb-43f1-8b80-09b15ee0836c.JPG" width="300px" />
      </div>
    </dd>
  </dl>
  
### TwitterUserTimeline取得絞り込み機能
TwitterAPIからアクセストークンと自分のアカウントのTLを取得してグループ化したミュートワードを除外して表示する。   
<div align="center">
<img width="500px" src="https://user-images.githubusercontent.com/80461281/192428605-b8efd4c7-0a76-4720-b221-4ad7794ce083.png" />
</div>

### 技術スタック
<img src="https://user-images.githubusercontent.com/80461281/192429269-a98fda12-f55b-40b6-9aea-90a703cda23c.JPG" width="450px" />
