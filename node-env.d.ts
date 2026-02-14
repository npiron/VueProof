declare module '@vitest/eslint-plugin' {
  import type { ESLint } from 'eslint'
  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Record<string, unknown>
    }
  }
  export default plugin
}
