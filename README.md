# GomokuNarabe-gemini-mcp プロジェクト情報

このプロジェクト `GomokuNarabe-gemini-mcp` は、**Gemini CLI** を使用して開始および管理されました。

## GitHub-MCP を使用した GitHub リポジトリ管理

このGitHubリポジトリの初期設定とその後のプッシュは、Gemini CLI を介して **GitHub-MCP** (GitHub Management and Control Plane) を使用して実行されました。

### 主なプロンプトとアクション:

Gemini CLI が GitHub-MCP を使用して実行したプロンプトと対応するアクションの一部を以下に示します。

#### 1. リポジトリ作成

**プロンプト:**
```
github-mcpでこのプロジェクトのリポジトリを作成して
```

**追加のプロンプト (リポジトリ名とオーナー名について):**
```
リポジトリ名と、リポジトリを作成するGitHubのオーナー名（ご自身のユーザー名、または組織名）を教えていただけますか？
```
```
リポジトリ名は、GomokuNarabe-gemini-mcp
```
```
ma-mamama
```

**実行されたツール呼び出し (簡略化):**
```python
default_api.create_repository(name="GomokuNarabe-gemini-mcp", owner="ma-mamama", autoInit=True)
```

#### 2. プロジェクトの初回プッシュ

**プロンプト (リポジトリ作成後):**
```
このgitリポジトリのままプッシュして
```

**実行されたツール呼び出し (簡略化、認証と履歴の問題解決後):**
```python
default_api.run_shell_command(command="cd gomoku-react && git push -u origin main --force", description="Forces the push of the local main branch to the remote main branch, overwriting remote changes.")
```

#### 3. Issue 作成

**プロンプト:**
```
issuesに、碁盤の大きさ変更を可能にする機能追加をするチケットを作成して
```

**実行されたツール呼び出し (簡略化):**
```python
default_api.create_issue(owner="ma-mamama", repo="GomokuNarabe-gemini-mcp", title="碁盤の大きさ変更を可能にする機能追加", body="ユーザーが碁盤のサイズ（例: 9x9, 13x13, 15x15など）を自由に設定できるようにする機能を追加します。設定はゲーム開始前に行えるようにします。")
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```