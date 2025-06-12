import { combine } from 'lib/utility'

const isProxyHost = process.env.PROXY_HOST === 'vieux-carre.vercel.app'

export const ASSET_DIR = {
  LOGO: {
    svg: combine(isProxyHost ? 'support' : '', 'image', 'svg', 'vieux-carre-support.svg'),
    png: combine(isProxyHost ? 'support' : '', 'image', 'raster', 'vieux-carre-support.png')
  }
}