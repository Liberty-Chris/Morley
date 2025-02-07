
#!/usr/bin/env python3

import argparse
import json
import os

# Define paths to necessary files
PACKAGE_DIR = os.path.expanduser("~/PlutusLadder_Deployment_Package")
VALIDATOR_IR_FILE = os.path.join(PACKAGE_DIR, "Validator_IR.json")
PLUTUS_SCRIPT_FILE = os.path.join(PACKAGE_DIR, "Compiled_Plutus_Script.plutus")
DEPLOYMENT_GUIDE_FILE = os.path.join(PACKAGE_DIR, "PlutusLadder_Deployment_Guide.txt")
TESTING_FRAMEWORK_FILE = os.path.join(PACKAGE_DIR, "PlutusLadder_Testing_Framework.txt")

# Ensure the package directory exists
if not os.path.exists(PACKAGE_DIR):
    os.makedirs(PACKAGE_DIR)

def load_validator_ir():
    """ Loads and displays the Validator-Based IR """
    if not os.path.exists(VALIDATOR_IR_FILE):
        print("Validator IR file not found.")
        return
    with open(VALIDATOR_IR_FILE, "r") as f:
        data = json.load(f)
        print(json.dumps(data, indent=4))

def load_plutus_script():
    """ Loads and displays the compiled Plutus script """
    if not os.path.exists(PLUTUS_SCRIPT_FILE):
        print("Compiled Plutus script file not found.")
        return
    with open(PLUTUS_SCRIPT_FILE, "r") as f:
        print(f.read())

def deploy_plutus_script():
    """ Outputs deployment instructions """
    if not os.path.exists(DEPLOYMENT_GUIDE_FILE):
        print("Deployment guide not found.")
        return
    with open(DEPLOYMENT_GUIDE_FILE, "r") as f:
        print(f.read())

def run_testing_framework():
    """ Outputs the testing framework steps """
    if not os.path.exists(TESTING_FRAMEWORK_FILE):
        print("Testing framework guide not found.")
        return
    with open(TESTING_FRAMEWORK_FILE, "r") as f:
        print(f.read())

def main():
    parser = argparse.ArgumentParser(description="PlutusLadder CLI - A tool for interacting with the PlutusLadder Compiler.")
    parser.add_argument("--show-ir", action="store_true", help="Display the Validator-Based IR")
    parser.add_argument("--show-plutus", action="store_true", help="Display the compiled Plutus script")
    parser.add_argument("--deploy", action="store_true", help="Display deployment guide")
    parser.add_argument("--test", action="store_true", help="Display testing framework guide")

    args = parser.parse_args()

    if args.show_ir:
        load_validator_ir()
    elif args.show_plutus:
        load_plutus_script()
    elif args.deploy:
        deploy_plutus_script()
    elif args.test:
        run_testing_framework()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
