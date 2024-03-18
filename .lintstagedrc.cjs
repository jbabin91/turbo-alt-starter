module.exports = {
  // Type check TypeScript files
  '(apps|packages|tooling)/**/*.(ts|tsx)': () => 'pnpm typecheck',
  // Lint then format TypeScript and JavaScript files
  '(apps|packages|tooling)/**/*.(ts|tsx|js)': (files) => [
    `pnpm eslint --max-warnings 0 ${files.join(' ')}`,
    `pnpm prettier -uc ${files.join(' ')}`,
  ],
};
