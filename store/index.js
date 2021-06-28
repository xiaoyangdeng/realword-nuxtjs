/**
 * 状态管理
 */
const cookieparser = process.server ? require('cookieparser') : undefined

//在服务端渲染期间运行的都是同一个实例
//为了防止数据冲突，一定要将state设置成函数，返回数据对象
export const state = () => {
    return {
        //当前登录用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    //nuxtServerInit是一个特殊的action方法
    //会在服务端渲染的时候自动调用
    //初始化容器数据，传递给客户端使用
    nuxtServerInit({ commit }, { req }) {
        let user = null
        console.log("nuxtServerInit");
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                console.log(JSON.parse(parsed.user))
                user = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setUser', user)
    }
}