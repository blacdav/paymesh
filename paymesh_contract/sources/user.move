// module paymesh_contract::user {
//     // use sui::object::{Self, UID};
//     // use sui::tx_context::{Self, TxContext};
//     // use sui::transfer;
//     // use sui::coin;
//     use sui::coin::Coin;
//     use sui::sui::SUI;
//     // use usdc::usdc::USDC;
//     // use std::string::String;

//     // handles payment splitting rule
//     public struct PaymentRule has copy, drop, store {
//         recipient: address,
//         percentage: u8,
//     }

//     public struct PaymentFlow has key {
//         id: UID,
//         rules: vector<PaymentRule>,
//         owner: address,
//     }

//     public fun create_payment_flow(
//         ctx: &mut TxContext,
//         rules: vector<PaymentRule>
//     ): PaymentFlow {
//         let owner = tx_context::sender(ctx);
//         let id = object::new(ctx);
//         PaymentFlow { id, rules, owner }
//     }

//     // Internal helper to sum all percentages
//     fun sum_percentages(rules: &vector<PaymentRule>): u64 {
//         let mut sum = 0;
//         let len = vector::length(rules);
//         let mut i = 0;

//         while (i < len) {
//             let rule = vector::borrow(rules, i);
//             sum = sum + (rule.percentage as u64);
//             i = i + 1;
//         };

//         sum
//     }

//     const E_NOT_OWNER: u64 = 0;
//     /// Percentages must sum to 100
//     const E_INVALID_PERCENTAGE_SUM: u64 = 1;

//     public entry fun execute_payment_flow(
//         flow: &PaymentFlow,
//         mut amount: u64,
//         mut token: Coin<SUI>,
//         ctx: &mut TxContext
//     ) {
//         assert!(flow.owner == tx_context::sender(ctx), E_NOT_OWNER);

//         let total_percentage = sum_percentages(&flow.rules);
//         assert!(total_percentage == 100, E_INVALID_PERCENTAGE_SUM);

//         let mut remaining = amount;

//         let rule_count = vector::length(&flow.rules);
//         let mut i = 0;

//         while (i < rule_count) {
//             let rule = vector::borrow(&flow.rules, i);
//             let share = (amount * (rule.percentage as u64)) / 100;

//             // For the last recipient, send all remaining to handle rounding
//             if (i == rule_count - 1) {
//                 transfer::transfer(token, rule.recipient);
//             } else {
//                 let coin_part = split(&mut token, share);
//                 transfer::transfer(coin_part, rule.recipient);
//                 remaining = remaining - share;
//             };

//             i = i + 1;
//         };
//     }

//     // public fun release_escrow_if_confirmed(
//     //     escrow: Escrow,
//     //     condition_met: bool
//     // ) {
        
//     // }
// }