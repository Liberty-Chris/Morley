# PlutusLadder Deployment Guide

## 1. Overview

This document provides a step by step guide to deploying a Plutus smart contract compiled from Ladder Logic using Morley's PlutusLadder framework. It assumes the user has a compiled Plutus script and the necessary metadata files.

## 2. Prerequisites

Before deploying, ensure you have the following:

- `Validator_IR.json`: The Intermediate Representation (IR) of the compiled Ladder Logic contract.
- `Compiled_Plutus_Script.plutus`: The final Plutus Core script ready for deployment.
- `cardano-cli`: The Cardano command-line interface.
- A funded Cardano wallet with access to deploy contracts.

## 3. Deployment Steps

### Step 1: Verify the Compiled Plutus Script
Ensure that `Compiled_Plutus_Script.plutus` has been successfully generated

```sh
cat Compiled_Plutus_Script.plutus
```

If the file is empty or contains errors, regenerate the script using PlutusLadder.

### Step 2: Generate the Plutus Address
Create the script address based on the compiled script:

```sh
cardano-cli address build \
  --payment-script-file Compiled_Plutus_Script.plutus \
  --testnet-magic 109 \
  --out-file script.addr
```

### Step 3: Fund the Script Address
Send ADA to the script address to cover execution costs.

### Step 4: Submit a Transaction to Execute the Contract
Use `cardano-cli` to interact with the contract and execute transactions.

```sh
cardano-cli transaction build \
  --testnet-magic 109 \
  --tx-in <TX_IN> \
  --tx-out $(cat script.addr)+2000000 \
  --change-address <YOUR_WALLET_ADDRESS> \
  --out-file tx.raw
```

Sign and submit the transaction:

```sh
cardano-cli transaction sign \
  --tx-body-file tx.raw \
  --signing-key-file <YOUR_SIGNING_KEY> \
  --testnet-magic 109 \
  --out-file tx.signed

cardano-cli transaction submit --tx-file tx.signed --testnet-magic 109
```

### Step 5: Verify Execution
Use `cardano-cli` or a blockchain explorer to check the status of the contract execution.

## 4. Troubleshooting

- If the contract does not execute correctly, check the logs and verify `Compiled_Plutus_Script.plutus`.
- Ensure your wallet has sufficient ADA to cover transaction fees.
- Use `cardano-cli transaction view` to debug errors in transaction creation.

## 5. Next Steps

Once deployed, you can:

- Automate interactions with off-chain applications.
- Connect the contract to Hydra for adavanced use cases.
- Implement additional testing to validate smart contract conditions.

Refer to the `PlutusLadder_Testing_Framework.txt` for further details on testing methodologies.

