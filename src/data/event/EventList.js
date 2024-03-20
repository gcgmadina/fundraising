import { createResource } from "frappe-ui";
import { reactive } from 'vue';

export const eventResource = createResource({
    url: "non_profit.api.fundraising.get_event_list",
    auto: true,
    realtime: true,
    transform(data) {
        let count = 0;
        for (let i in data) {
            if (count < 10) {
                tenEvents.push(data[i]);
                count++;
            } else {
                break;
            }
        }
        return data;
    }
});

export const tenEvents = reactive([]);

export const getEventScroll = () => {
    let data_event = createResource({
        url: "non_profit.api.fundraising.get_event_list",
        realtime: true,
        transform(data) {
            let count = eventScrollData.length;
            for (let i = 0; i < 5; i++) {
                if (i + count < data.length)
                    eventScrollData.push(data[i + count]);
                else
                    break;
            }
        }
    })

    data_event.reload();
}

export const eventScrollData = reactive([]);

export const donationEvent = createResource({
    url: "non_profit.api.fundraising.get_donation_events",
    auto: true,
    realtime: true,
    transform(data) {
        let count = 0;
        for (let i in data) {
            if (count < 10) {
                tenDonationEvents.push(data[i]);
                count++;
            } else {
                break;
            }
        }
        return data;
    }
});

export const tenDonationEvents = reactive([]);

export const getDonationEventScroll = () => {
    let data_event = createResource({
        url: "non_profit.api.fundraising.get_donation_events",
        realtime: true,
        transform(data) {
            let count = donationEventScrollData.length;
            for (let i = 0; i < 5; i++) {
                if (i + count < data.length)
                    donationEventScrollData.push(data[i + count]);
                else
                    break;
            }
        }
    })

    data_event.reload();
}

export const donationEventScrollData = reactive([]);
