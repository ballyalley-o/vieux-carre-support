import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)

const config = {
  source: [resolve(__dirname, 'src/design/token/reference/**/*.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: resolve(__dirname, 'src/design/token/css'),
      files: [
        {
          destination: 'token.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
}

export default config