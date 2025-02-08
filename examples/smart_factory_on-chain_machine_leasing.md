# Smart Factory with On-Chain Machine Leasing

## 1. Overview

A factory leases industrial robots and CNC machines on a pay-per-use basis. The machines interact with a Plutus smart contract to verify leasing conditions before operating. If payment credits are available, the machines continue running. If the balance is depleted, the machines automatically lock until additional tokens are provided.

## 2. System Components

### Sensors & Conditions

| Sensor | Condition Monitored | Threshold |
|------------|------------------------|--------------|
| **Cycle Counter** | Tracks number of machine operations | +1 per completed cycle |
| **Usage Timer** | Measures total runtime of the machine | Triggers hourly updates |
| **Credit Check** | Queries the blockchain for token balance | Must have sufficient balance to operate |
| **Lock Signal** | Disables machine if payment runs out | Activated when credits = 0 |

## 3. Ladder Logic for Machine Leasing

```ladder
INPUT CYCLE_COUNTER
INPUT USAGE_TIMER
INPUT CREDIT_CHECK
INPUT LEASE_RESET

> CREDIT_CHECK 0 MACHINE_LOCKED
NO MACHINE_LOCKED
OUTPUT MACHINE_RUNNING

AND MACHINE_RUNNING CYCLE_COUNTER
OUTPUT UPDATE_CYCLE

AND MACHINE_RUNNING USAGE_TIMER
OUTPUT UPDATE_USAGE

AND LEASE_RESET MACHINE_LOCKED
RESET MACHINE_LOCKED
```

### How it Works
- If **CREDIT_CHECK** is greater than zero, the **MACHINE_RUNNING** signal remains active.
- Each **completed cycle and usage time update** sends data to the blockchain.
- If **credit balance reaches zero**, the **MACHINE_LOCKED** state is triggered, stopping operation.
- A factory must **send additional tokens** and trigger **LEASE_RESET** to resume operations.

## 4. LadderCore IR Representation

```json
{
  "instructions": [
    { "type": "INPUT", "args": ["CYCLE_COUNTER"] },
    { "type": "INPUT", "args": ["USAGE_TIMER"] },
    { "type": "INPUT", "args": ["CREDIT_CHECK"] },
    { "type": "INPUT", "args": ["LEASE_RESET"] },
    { "type": ">", "args": ["CREDIT_CHECK", "0", "MACHINE_LOCKED"] },
    { "type": "NO", "args": ["MACHINE_LOCKED"] },
    { "type": "OUTPUT", "args": ["MACHINE_RUNNING"] },
    { "type": "AND", "args": ["MACHINE_RUNNING", "CYCLE_COUNTER"] },
    { "type": "OUTPUT", "args": ["UPDATE_CYCLE"] },
    { "type": "AND", "args": ["MACHINE_RUNNING", "USAGE_TIMER"] },
    { "type": "OUTPUT", "args": ["UPDATE_USAGE"] },
    { "type": "AND", "args": ["LEASE_RESET", "MACHINE_LOCKED"] },
    { "type": "RESET", "args": ["MACHINE_LOCKED"] }
  ]
}
```

## 5. Plutus Haskell Smart Contract

```haskell
{-# INLINABLE validate #-}
validate :: BuiltinData -> BuiltinData -> ScriptContext -> Bool
validate datum redeemer ctx =
    let txInfo = scriptContextTxInfo ctx
        leaseBalance = findDatum "CREDIT_CHECK" datum
        resetSignal = findDatum "LEASE_RESET" redeemer
    in
    if resetSignal then
        traceIfFalse "Lease reset requested, unlocking machine" True
    else
        traceIfFalse "Insufficient balance, machine locked" (leaseBalance > 0)

script :: PlutusScript
script = mkValidatorScript $$(PlutusTx.compile [|| validate ||])
```

## 6. Plutus Core Output (Final Smart Contract)

```plutus
(program 1.0.0
    [
        (validate
            (lambda (datum redeemer ctx)
                (let ((txInfo (scriptContextTxInfo ctx)))
                    (or
                        (traceIfFalse "Lease reset requested, unlocking machine" (LEASE_RESET redeemer))
                        (traceIfFalse "Insufficient balance, machine locked" (CREDIT_CHECK txInfo > 0))
                    )
                )
            )
        )
    ]
)
```

## 7. Hydra Interaction: Machine Queries Smart Contract

### Machine Queries Blockchain for Credit Balance
```json
{
  "query": "CREDIT_CHECK"
}
```

### Hydra Contract Response
```json
{
  "status": "BALANCE_OK",
  "credit_balance": 500
}
```

### Machine Submits Usage Data
```json
{
  "action": "UPDATE_CYCLE",
  "inputs": {
    "CYCLES_COMPLETED": 100
  }
}
```

### Hydra Response
```json
{
  "status": "CYCLE_UPDATED",
  "message": "Cycle count updated successfully"
}
```

### Machine Locks When Credit Runs Out
```json
{
  "query": "CREDIT_CHECK"
}
```

```json
{
  "status": "BALANCE_EMPTY",
  "message": "Insufficient funds, machine locked"
}
```

## 8. Periodic State Commitments to Cardano

Machines operate off-chain via Hydra, and final leasing payments are settled on the Cardano main chain at the end of each billing period.

### Final On-Chain Settlement
```json
{
  "blockchain_settlement": {
    "epoch": 200,
    "total_cycles_used": 1000,
    "total_tokens_spent": 5000,
    "remaining_balance": 0
  }
}
```

## 9. Full System Flow

1. The smart contract is deployed on Cardano, defining leasing conditions.
2. Machines ping the contract via Hydra to check available credits.
3. Machines submit cycle and usage data for tracking.
4. If tokens are available, machines continue running.
5. If tokens run out, the machines lock until additional payment is made.
6. Periodic settlements record leasing activity on Cardano.

## 10. Why This Model Works

| Feature | Benefit |
|------------|------------|
| **Main Chain Contract** | Immutable leasing logic ensures transparency. |
| **Hydra Off-Chain Processing** | Low-cost, real time machine interactions. |
| **Automated Machine Locking** | Ensures machines are only used when paid for. |
| **Tokenized Leasing System** | Allows factories to stake, trade, and prepay for usage. |


This example integrates industrial automation with smart contracts, ensuring tamper proof leasing, automated payments, and blockchain based usage tracking.

