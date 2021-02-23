# Repro for unusual splitChunks for "css/mini-extract" modules and HMR

Considering follow `splitChunks` config which extract all css to single file:

```js
  optimization: {
    splitChunks: {
      chunks: `all`,
      cacheGroups: {
        default: false,
        defaultVendors: false,
        styles: {
          test(module) {
            return module.type === `css/mini-extract`;
          },

          name: `main`,
          priority: 40,
          enforce: true,
        },
      },
    },
  },
```

When css is imported in module that is dynamically imported, but before it's actually loaded in the browser (for example it's style imported by template that is not currently used). The css does get extracted into the file as we would expect given the configuration and we can see it actually applied (makes sense, as it all lands in single css file). However when editing .css file we don't get HMR. Refreshing the page after edit will use updated css.

## Steps

1. Install deps (`npm install` / `yarn`)
2. Run `npm run start` / `yarn start`
3. Open browser at url printed by `webpack-dev-server` in terminal
4. Edit "style.css" (change background to `yellow`) - no HMR
5. Click button on the page (it will actually load and eval chunk that actually import css file), but still style is not applied (probably related to https://github.com/webpack-contrib/mini-css-extract-plugin/issues/706 as new css module is loaded, but style doesn't reload)
6. Re-save "style.css" without any changes or edit "style.css" again and save (f.e. change background to `white`) - we get HMR
