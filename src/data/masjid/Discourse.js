import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const discourse = reactive ({
    getList: createResource ({
        url: "non_profit.api.discourse.get_islamic_discourse_list",
        auto: false,
        makeParams( data =  null ) {
            // console.log(data)
            return data
        },
        transform(response) {
            if (response.data.length == 0) {
                return {
                    stop: true,
                    data: response.data
                }
            } else {
                return {
                    stop: false,
                    data: response.data
                }
            }
        },
        onError(error) {
            console.log(error)
        }
    }),
})