// https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3
import { http } from '../utils/http'
import { IResultOr as IResult, IRoomListParams } from './interface'
import airbnb from '../db'

// 真实接口———首页房屋列表接口
export function fetchRoomList(params: IRoomListParams): Promise<IResult> {
  return http.httpGet('http://110.42.184.111/api/room/room/getRoomList', params)
}

// Mock接口
export async function fetchElephant() {
  await airbnb.airbnbDB.openStore({ elephant: { keyPath: 'id', indexs: ['nose', 'ear'] } })
  const result = await airbnb.airbnbDB.getList('elephant').then(res => {
    return { code: '000000', message: '操作成功', result: res, success: true }
  })
  return result
}
