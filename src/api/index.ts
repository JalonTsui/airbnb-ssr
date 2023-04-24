import { http } from '../utils/http'
import DB from '@/utils/indexedDB'
const airbnbDB = new DB('airbnbDB')

// 真实接口
export function fetchDemo() {
  return http.httpGet('http://127.0.0.1:1578/login')
}

// api/index.ts 
// Mock接口
export async function fetchElephant() {
  await airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])      // 连接数据库
  const result = await airbnbDB.getList('elephant').then(res => {  // 查询数据
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  return result
}

