import vue from "vue";
import dayjs from "dayjs"

vue.filter("data", (val, formate = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(val).format(formate)
})