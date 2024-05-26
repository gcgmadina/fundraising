import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export function getExpenses(expense_type) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "GET",
            url: "non_profit.api.fundraising.get_expenses",
            params: {
                case: expense_type,
            },
            onSuccess: (data) => {
                let count = expensesData.length;
                expensesDataLength.value = data.length;
                for (let i=0; i<5; i++) {
                    if (i < data.length) {
                        expensesData.push(data[i+count]);
                    } else {
                        break;
                    }
                }
                resolve(data);
            },
            onError: (error) => {
                console.error("Error fetching expenses data:", error);
                reject(error);
            }
        });
        resource.reload();  // Memastikan resource di-reload setelah inisialisasi
    });
}

export const expensesData = reactive([]);
export const expensesDataLength = ref(0);

export function newExpense(expense_type, amount, date) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.add_expense",
            params: {
                case: expense_type,
                amount: amount,
                date: date,
            },
            onSuccess: (data) => {
                console.log("New expense created:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error creating new expense:", error);
                reject(error);
            }
        });
        resource.reload();
    });
}