import { createResource } from "frappe-ui"
import { reactive, ref } from 'vue'

export const expensesResource = (expense_type) => {
    let data_expenses = createResource({
        url: "non_profit.api.fundraising.get_expenses",
        params: {
            case: expense_type,
        },
        transform(data) {
            let count = expensesData.length;
            expensesDataLength.value = data.length;
            for (let i = 0; i < 5; i++) {
                if (i + count < data.length)
                    expensesData.push(data[i + count]);
                else
                    break;
            }
        }
    })

    data_expenses.reload();
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

export function cancelExpense(expense_id) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.cancel_expense",
            params: {
                journal_entry_id: expense_id,
            },
            onSuccess: (data) => {
                console.log("Expense deleted:", data);
                resolve(data);
            },
            onError: (error) => {
                console.error("Error deleting expense:", error);
                reject(error);
            }
        });
        resource.reload();
    });
}