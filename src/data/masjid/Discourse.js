import { createResource, toast } from "frappe-ui"
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
    getDetail: createResource ({
        url: "non_profit.api.discourse.get_islamic_discourse",
        auto: false,
        makeParams( name ) {
            return { name }
        },
        transform(response) {
            return response.data
        },
        onError(error) {
            console.log(error)
        }
    }),
    create: createResource ({
        url: "non_profit.api.discourse.new_islamic_discourse",
        auto: false,
        makeParams( data ) {
            return { data }
        },
        transform(response) {
            if (response.status == "success") {
                toast({
                    title: "Sukses",
                    text: response.message,
                    icon: "check-circle",
                    position: "bottom-center",
                    iconClasses: "text-green-500"
                })
            } else {
                toast({
                    title: "Gagal",
                    text: response.message,
                    icon: "x-circle",
                    position: "bottom-center",
                    iconClasses: "text-red-500"
                })
            }
        },
        onError(error) {
            toast({
                title: "Gagal",
                text: error.message,
                icon: "x-circle",
                position: "bottom-center",
                iconClasses: "text-red-500"
            })
        }
    }),
})