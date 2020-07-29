# aws-lambda-tweet-to-hatebu

Twitter のツイートに  `B!`  があれば、はてブに追加する。

- [Twitter](https://twitter.com/opp_hatena)
- [はてなブックマーク](https://b.hatena.ne.jp/oppara/bookmark)

## デプロイ

Lambda, EventBridge (CloudWatch Events) へのデプロイ。

```sh
% make
```

## テスト

ローカル環境で動作確認。

```sh
% make try
```

以下に環境変数を用意しておく。

src/.env
```
HATENA_CONSUMER_KEY=XXXXXXXX
HATENA_CONSUMER_SECRET=XXXXXXXX
HATENA_ACCESS_TOKEN=XXXXXXXX
HATENA_ACCESS_TOKEN_SECRET=XXXXXXXX
TWITTER_BEARER=XXXXXXXX
```

## 参考

- [TwitterのツイートにURLがあったら「はてなブックマーク」にブックマーク追加する仕組みをPythonで実装してAWS Lambdaで動してみた - Qiita](https://qiita.com/kai_kou/items/c4a153cdb3dd06a0df2a)
- [Lambda FunctionsをCloudFormationでデプロイするbashスクリプト - Qiita](https://qiita.com/tsukamoto/items/e6f77ff29e6c986518a5)
- [スタックの有無で待つ状態を切り替える - Qiita](https://qiita.com/oppara/items/dcc56f44127652f09825)
- [スケジュール起動するLambda関数をCloudFormationで作成してみた | Developers.IO](https://dev.classmethod.jp/articles/scheduledlambda-cloudformation/)

## License

[MIT](https://oppara.mit-license.org/2020)

