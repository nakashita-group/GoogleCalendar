woff
  .init({
    //EndPointURLに初めてリダイレクトされるタイミングで実行
    woffId: "IVCZ_AGAYGrA42PUsNfg4Q"
  })
  .then(() => {
    console.log("初期化完了！！");

    //ログイン情報がない場合ログイン画面表示
    if (!woff.getAccessToken()) {
      console.log("トークンなし → 認可フロー開始");
      woff.login();
      return;
    }

    console.log(woff.getAccessToken());

    //プロフィール情報取得
    woff.getProfile()
      .then((profile) => {
        console.log("プロフィール情報:", profile);
        document.getElementById("UserName").innerText = profile.displayName;
      })

  })
  .catch((err) => {
    // 初期化処理中にエラーが発生した場合
    console.log("エラー発生！！");
    console.log(err.code, err.message);
  });