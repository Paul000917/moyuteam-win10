/**封装一些通用的接口,避免重复书写 */
import { http } from '@/utils/http'

const api = {
    getMenuList(func){
        http.get('/managemenu', (response) => { func(response)})
    },

}
export default api