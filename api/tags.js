import { request } from "@/plugins/request"

//用户登录
export const getTags = params => {
    return request({
        method: "GET",
        url: "/api/tags",
        params
    })
}