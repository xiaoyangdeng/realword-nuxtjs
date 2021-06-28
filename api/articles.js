import { request } from "@/plugins/request"

//获取用户数据
export const getArticles = params => {
    return request({
        method: "GET",
        url: "/api/articles",
        params
    })
}
///api/articles/feed
//获取用户关注数据
export const getFeedArticles = params => {
    return request({
        method: "GET",
        url: "/api/articles/feed",
        // headers: {
        //     //Authorization: Token jwt.token.here
        //     Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc1Njg4LCJ1c2VybmFtZSI6ImRlbmciLCJleHAiOjE2Mjk0Mjk4OTh9.fUq5KutePriUyJpANLlrXMCc_FtIaknZwPpfjOFn_mo`
        // },
        params
    })
}

//文章点赞/api/articles/:slug/favorite
export const addFavorite = slug => {
    return request({
        method: "POST",
        url: `/api/articles/${slug}/favorite`,
    })
}
//取消点赞
export const deleteFavorite = slug => {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}/favorite`,
        //   
    })
}
//文章详情
export const getArticlesDetail = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}`,
        //   
    })
}
//获取文章评论
export const getComments = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}/comments`,
        //   
    })
}