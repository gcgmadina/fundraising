import { createResource } from "frappe-ui"
import { transform, update } from "lodash"
import { toast } from "node_modules/frappe-ui/src/index"
import { reactive, ref } from 'vue'
import { on } from "ws"

export const masjidProfile = reactive ({
    getProfile: createResource ({
        url: "non_profit.api.charity.get_masjid_profile",
        auto: false,
        makeParams(data) {
            return {data}
        },
        onSuccess(response) {
            if (response.status == "success") {
                return response.data
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
    updateProfile: createResource ({
        url: "non_profit.api.charity.update_masjid_profile",
        auto: false,
        makeParams(data) {
            return {data}
        },
        onSuccess(response) {
            if (response.status == "success") {
                toast({
                    title: "Berhasil",
                    text: "Data masjid berhasil diupdate",
                    icon: "check",
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
    })
})