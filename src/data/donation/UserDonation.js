import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'
import { session } from '@/data/session'

export const userDonationResource = () => {
    let data_user_donation = createResource({
        url: "non_profit.api.fundraising.get_user_donations",
        realtime: true,
        params: {
            user: session.user
        },
        transform(data) {
            let count = userDonationData.length;
            userDonationDataLength.value = data.length;
            for (let i = 0; i < 5; i++) {
                if (i + count < data.length)
                    userDonationData.push(data[i + count]);
                else
                    break;
            }
            return data;
        }
    })

    data_user_donation.reload();
}


export const userDonationData = reactive([]);
export const userDonationDataLength = ref(0);