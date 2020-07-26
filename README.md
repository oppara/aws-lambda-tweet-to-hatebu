# aws-lambda-tweet-to-hatebu

Twitter のツイートに  `B!`  があれば、はてブに追加する。

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

## License

[MIT](https://oppara.mit-license.org/2020)

