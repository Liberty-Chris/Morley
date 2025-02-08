#!/bin/bash

# Define necessary variables
SCRIPT_ADDRESS="scripts/script.addr"
TX_OUT="$(cat $SCRIPT_ADDRESS)+2000000"
CHANGE_ADDRESS="<YOUR_WALLET_ADDRESS>"

# Step 1: Build the transaction
cardano-cli transaction build \
  --tx-in <TX_IN> \
  --tx-out $TX_OUT \
  --change-address $CHANGE_ADDRESS \
  --testnet-magic 109 \
  --out-file tx.raw

echo "Transaction built. Signing the transaction..."

# Step 2: Sign the transaction
cardano-cli transaction sign \
  --tx-body-file tx.raw \
  --signing-key-file <YOUR_SIGNING_KEY> \
  --testnet-magic 109 \
  --out-file tx.signed

echo "Transaction signed. Submitting the transaction..."

# Step 3: Submit the transaction
cardano-cli transaction submit \
  --tx-file tx.signed \
  --testnet-magic 109

echo "Transaction submitted successfully."
