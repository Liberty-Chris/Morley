#!/bin/bash

# Define paths to the compiled Plutus script and address file
PLUTUS_SCRIPT_FILE="Compiled_Plutus_Script.plutus"
SCRIPT_ADDRESS_FILE="script.addr"

# Check if the Plutus script file exists
if [ ! -f "$PLUTUS_SCRIPT_FILE" ]; then
  echo "Error: Plutus script file ($PLUTUS_SCRIPT_FILE) not found!"
  exit 1
fi

# Generate the script address
cardano-cli address build   --payment-script-file "$PLUTUS_SCRIPT_FILE"   --testnet-magic 109   --out-file "$SCRIPT_ADDRESS_FILE"

echo "Script address generated and saved to $SCRIPT_ADDRESS_FILE"

# Fund the script address (placeholder for funding step)
echo "Fund the script address with ADA using a separate transaction."
