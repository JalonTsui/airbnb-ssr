// const manifest = (await import('./dist/client/ssr-manifest.json'))
// const manifest = require('./dist/client/ssr-manifest.json')
// import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
// const manifest = fs.readFileSync('./dist/client/ssr-manifest.json', 'utf-8')
// console.log(manifest)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
console.log(path.resolve(__dirname, 'dist/client/ssr-manifest.json'))
