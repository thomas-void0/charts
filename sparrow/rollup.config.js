import babel from 'rollup-plugin-babel'

export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/sparrow.js", // 对于node打包成common.js
      format: 'cjs'
    },
    {
      file: 'esm/sparrow.js', // 对于浏览器打包成ES module
      format: "es"
    },
    {
      file: 'dist/sparrow.min.js', // 对于Node.js和浏览器打包成混合模式 
      name: "sp",
      format: "umd"
    },
  ],
  plugins: [
    babel(),// 使用babel插件
  ]
}