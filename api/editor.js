import { request } from "@/plugins/request"

//获取用户详情用户登录
export const publicArticles = data => {
    return request({
        method: "POST",
        url: `/api/articles`,
        data
    })
}

//获取用户详情用户登录
export const modifyArticles = ({ data, slug }) => {
    return request({
        method: "put",
        url: `/api/articles/${slug}`,
        data
    })
}
