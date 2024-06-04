import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const itemGroupResource = createResource({
    url: "non_profit.api.fundraising.get_item_group",
    auto: true,
    transform(data) {
        for (let i in data) {
            itemGroupList.push(data[i]);
        }
    }
});

export const itemGroupList = reactive([]);

export function addItemGroup(item_group) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.add_item_group",
            params: {
                item_group_name: item_group,
            },
            onSuccess: (data) => {
                console.log("New item group created:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error creating new item group:", error);
                reject(error);
            },
        });
        resource.reload();
    });
}

export function deleteItemGroups(item_groups) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.delete_item_groups",
            params: {
                item_groups: item_groups,
            },
            onSuccess: (data) => {
                console.log("Item group deleted:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error deleting item group:", error);
                reject(error);
            },
        });
        resource.reload();
    });
}

export const assetCategoryResource = createResource({
    url: "non_profit.api.fundraising.get_asset_category",
    auto: true,
    transform(data) {
        for (let i in data) {
            assetCategoryList.push(data[i]);
        }
    }
});

export const assetCategoryList = reactive([]);

export function addAssetCategory(asset_category) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.add_asset_category",
            params: {
                asset_category: asset_category,
            },
            onSuccess: (data) => {
                console.log("New asset category created:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error creating new asset category:", error);
                reject(error);
            },
        });
        resource.reload();
    });
}

export function deleteAssetCategories(asset_categories) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.delete_asset_categories",
            params: {
                asset_categories: asset_categories,
            },
            onSuccess: (data) => {
                console.log("Asset category deleted:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error deleting asset category:", error);
                reject(error);
            },
        });
        resource.reload();
    });
}

export const itemResource = (item_group, asset_category = null) => {
    let params = {
        item_group: item_group
    };

    if (item_group === "Aset Tetap" && asset_category) {
        params.asset_category = asset_category;
    }

    let data_items = createResource({
        url: "non_profit.api.fundraising.get_item_by_group",
        params: params,
        transform(data) {
            console.log(data);
            for (let i in data) {
                itemList.push(data[i]);
            }
        }
    });

    data_items.reload();
}


export const itemList = reactive([]);

export const uomResource = createResource({
    url: "non_profit.api.fundraising.get_uom",
    auto: true,
    transform(data) {
        for (let i in data) {
            uomList.push(data[i]);
        }
    }
});

export const uomList = reactive([]);

export function addItem(item_group, item) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.add_item",
            params: {
                item_group: item_group,
                item: item,
            },
            onSuccess: (data) => {
                console.log("New item created:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error creating new item:", error);
                reject(error);
            },
        });
        resource.reload();
    });
}