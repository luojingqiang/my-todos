const {override, addWebpackAlias, useEslintRc} =require('customize-cra')
const path=require('path')
module.exports=override(
  // useEslintRc()
  addWebpackAlias({
    '@': path.resolve(__dirname, './src')
  }),
  useEslintRc(path.resolve(__dirname, './.eslintrc.json'))
)