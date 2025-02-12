import { createResource, toast } from "frappe-ui"
import { method, transform } from "lodash"
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

    getList: createResource ({
        url: "non_profit.api.charity.get_fundraisings",
        auto: false,
        makeParams( data ) {
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
            toast({
                title: "Gagal",
                text: error.message,
                icon: "x-circle",
                position: "bottom-center",
                iconClasses: "text-red-500"
            })
        }
    }),

    detail: createResource ({
        url: "non_profit.api.charity.get_fundraising_details",
        auto: false,
        makeParams(data) {
            // return {
            //     fundraising: id
            // }
            return data
        },
        transform(response) {
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
})

export const journalEntry = reactive ({
    create: createResource ({
        url: "non_profit.api.charity.new_fundraising_journal_entry_receive",
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
        }
    }),

    list: createResource ({
        url: "non_profit.api.charity.get_fundraising_journal_entry_received",
        auto: false,
        makeParams(data) {
            return data
        },
        transform(response) {
            if ( response.status == "success" ) {
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

    detail: createResource ({
        url: "non_profit.api.charity.get_fundraising_journal_entry_received_details",
        auto: false,
        makeParams(data) {
            return data
        },
        transform(response) {
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

    verify: createResource ({
        url: "non_profit.api.charity.submit_fundraising",
        auto: false,
        makeParams(data) {
            console.log(data)
            return data
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
        }
    }),
    allocation: createResource ({
        url: "non_profit.api.charity.new_fundraising_journal_entry_allocation",
        auto: false,
        makeParams(data) {
            return data
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