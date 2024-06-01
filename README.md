
## 最初にやること

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
npm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## ディレクトリ構成について

* app
  * ルーティングにまつわる主要な部分を構成するディレクトリです。
* components
  * 再利用可能なReactコンポーネントを格納するディレクトリです。
* features
  * 画面特有の機能やモジュールをまとめるためのディレクトリです。
* lib
  * ライブラリやユーティリティ関数を格納するためのディレクトリです。
* prisma
  * PrismaORMの関連ファイルを格納するためのディレクトリです。
* public
  * 静的ファイル（画像、フォント、その他のアセット）を格納するディレクトリです。

```sh
$ tree . -d -I node_modules
.
├── app
│   ├── api
│   │   └── todo
│   │       └── [id]
│   └── todo
├── components
├── features
│   └── PokemonGoPartyBuilder
│       ├── App
│       │   └── store
│       │       └── modules
│       ├── CreateParty
│       └── DisplayParty
├── lib
├── prisma
│   └── migrations
│       ├── 20240523153242_init
│       └── 20240524132028_init
└── public

19 directories
```

## 新しい.envを追加する

Vercel > zumis'project > pokemon-go-party-bulider > setting > Environment Variablesを開く。→ 任意のパラメータ名と値を入力し作成する。
  * https://vercel.com/zumis-projects/pokemon-go-party-builder/settings/environment-variables

※GoogleアカウントのAPIについて設定は下記リンクから。
https://console.cloud.google.com/apis/credentials?project=pokemo-go-builder
