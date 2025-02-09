import { createResource, toast } from "frappe-ui"
import { reactive, ref } from 'vue'

export const fundraising = reactive ({
    newFundraising: createResource ({
        url: "non_profit.api.charity.add_new_funsraising",
        auto: false,
        makeParams(data) {
            return {data}
        },
        onSuccess(response) {
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
        },
    }),
})