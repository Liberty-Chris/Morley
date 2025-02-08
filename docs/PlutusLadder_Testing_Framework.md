# PlutusLadder Testing Framework

## 1. Overview

This document outlines the testing procedures for verifying the correctness and security of Plutus smart contracts compiled from Ladder Logic using Morley's PlutusLadder framework.

## 2. Testing Environment Setup

Before running tests, ensure you have:

- `Validator_IR.json`: The Intermediate Representation of the contract.
- `Compiled_Plutus_Script.plutus`: The Plutus Core script.
- A local Cardano node or testnet environment.
- `cardano-cli` installed for manual interaction.

## 3. Test Cases

### 3.1. Syntax and Compilation Test
Ensure that the compiled Plutus script is syntactically correct.

```sh
cardano-cli transaction policyid --script-file Compiled_Plutus_Script.plutus
```

If the command outputs a valid script hash, the compilation is successful.

### 3.2. Validator Logic Test
Run a test transaction to check if the validator logic executes correctly.

```sh
cardano-cli transaction build \
  --tx-in <TX_IN> \
  --tx-out $(cat script.addr)+2000000 \
  --change-address <YOUR_WALLET_ADDRESS> \
  --testnet-magic 109 \
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

### 3.3. Edge Case Testing
Test boundary conditions for contract execution:

- Insufficient ADA to cover fees.
- Invalid transaction inputs.
- Attempting to execute contract logic under incorrect conditions.

### 3.4. Performance and Load Testing
Use a local testnet to simulate multiple interactions and measure execution speed and resource consumption.

```sh
for i in {1..10}; do
  cardano-cli transaction build --tx-in <TX_IN> --tx-out $(cat script.addr)+2000000 \
  --change-address <YOUR_WALLET_ADDRESS> --testnet-magic 109 --out-file tx_$i.raw
  cardano-cli transaction sign --tx-body-file tx_$i.raw --signing-key-file <YOUR_SIGNING_KEY> \
  --testnet-magic 109 --out-file tx_$i.signed
  cardano-cli transaction submit --tx-file tx_$i.signed --testnet-magic 109
done
```

## 4. Troubleshooting

- If transactions fail, verify the script’s hash and structure.
- Ensure that input conditions match expected contract logic.
- Check `cardano-node` logs for specific errors.

## 5. Continuous Integration (CI)

To automate testing, integrate these test cases into a CI/CD pipeline using GitHub Actions or another CI system. Run automated checks on each commit to ensure script correctness.

## 6. Get Funky

- Expand test coverage to include additional edge cases.
- Integrate Hydra for advanced use cases and benchmarking.
- Implement security audits to detect vulnerabilities before deployment.

