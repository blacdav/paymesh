module smart_contract::smart_contract {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    // handles payment splitting rule
    struct PaymentRule has copy, drop, store {
        reciepient: address,
        percentage: u8,
    }

    struct PaymentFlow has key {
        id: UID,
        rules: vector<PaymentRule>,
        owner: address,
    }

    public entry fun create_payment_flow(
        ctx: &mut TxContext,
        rules: vector<PaymentRule>
    ): PaymentFlow {
        let owner = tx_context::sender(ctx);
        let id = object::new(ctx);
        PaymentFlow { id, rules, owner }
    }

    // Internal helper to sum all percentages
    fun sum_percentages(rules: &vector<PaymentRule>): u8 {
        let mut sum = 0;
        let len = vector::length(rules);
        let mut i = 0;

        while (i < len) {
            let rule = vector::borrow(rules, i);
            sum = sum + rule.percentage;
            i = i + 1;
        }

        sum
    }

    public entry fun execute_payment_flow(
        flow: &PaymentFlow,
        mut amount: u64,
        token: object::Coin,
        ctx: &mut TxContext
    ) {
        assert!(flow.owner == tx_context::sender(ctx), 0, "Only owner can execute flow");

        let total_percentage = sum_percentages(&flow.rules);
        assert!(total_percentage == 100, 1, "Percentages must sum to 100");

        let mut remaining = amount;

        let rule_count = vector::length(&flow.rules);
        let mut i = 0;

        while (i < rule_count) {
            let rule = vector::borrow(&flow.rules, i);
            let share = (amount * (rule.percentage as u64)) / 100;

            // For the last recipient, send all remaining to handle rounding
            if (i == rule_count - 1) {
                transfer::transfer(&token, rule.recipient, remaining);
            } else {
                transfer::split_and_transfer(&mut token, share, rule.recipient, ctx);
                remaining = remaining - share;
            }

            i = i + 1;
        }
    }

    public entry fun release_escrow_if_confirmed(
        escrow: Escrow,
        condition_met: bool
    ) {
        
    }
}