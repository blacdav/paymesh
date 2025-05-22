module paymesh_contract::organization {
    use std::string::String;
    // use sui::clock::Clock;

    public struct StaffDetails has key {
        id: UID,
        staff_address: address,
        staff_role: String,
        staff_salary_amount: u64,
        staff_payment_frequency: u64,
    }

    public entry fun create_payroll(
        addrs: address,
        role: String,
        salary: u64,
        frequency: u64,
        ctx: &mut TxContext,
    ) {
        let id = object::new(ctx);
        let staffs = StaffDetails {
            id,
            staff_address: addrs,
            staff_role: role,
            staff_salary_amount: salary,
            staff_payment_frequency: frequency,
        };
        let organzation_address = tx_context::sender(ctx);

        transfer::transfer(staffs, organzation_address);
    }
}