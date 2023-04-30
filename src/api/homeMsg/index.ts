import { http } from '@/utils/http'
import { IResultOr as IResult, IRoomDetailParams } from '../interface'

// 真实接口———首页房屋详情接口
export function fetchRoomDetail(params: IRoomDetailParams): Promise<IResult> {
    return http.httpGet('http://110.42.184.111/api/room/room/getRoomDetail', params)
}
