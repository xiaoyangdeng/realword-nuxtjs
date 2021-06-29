import { request } from "@/plugins/request"

//获取用户详情用户登录
export const getUser = username => {
    return request({
        method: "GET",
        url: `api/profiles/${username}`,
        // data
    })
}
//获取文章列表
export const getArticlesList = params => {
    return request({
        method: "GET",
        url: "/api/articles",
        params
    })
}

