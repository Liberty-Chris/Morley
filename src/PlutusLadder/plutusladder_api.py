
from fastapi import FastAPI
import json
import os

app = FastAPI()

# Define paths to necessary files
PACKAGE_DIR = os.path.expanduser("~/PlutusLadder_Deployment_Package")
VALIDATOR_IR_FILE = os.path.join(PACKAGE_DIR, "Validator_IR.json")
PLUTUS_SCRIPT_FILE = os.path.join(PACKAGE_DIR, "Compiled_Plutus_Script.plutus")
DEPLOYMENT_GUIDE_FILE = os.path.join(PACKAGE_DIR, "PlutusLadder_Deployment_Guide.txt")
TESTING_FRAMEWORK_FILE = os.path.join(PACKAGE_DIR, "PlutusLadder_Testing_Framework.txt")

@app.get("/")
def read_root():
    return {"message": "Welcome to the PlutusLadder Compiler API"}

@app.get("/validator-ir")
def get_validator_ir():
    """ Returns the Validator-Based IR """
    if not os.path.exists(VALIDATOR_IR_FILE):
        return {"error": "Validator IR file not found"}
    with open(VALIDATOR_IR_FILE, "r") as f:
        data = json.load(f)
    return {"validator_ir": data}

@app.get("/plutus-script")
def get_plutus_script():
    """ Returns the compiled Plutus script """
    if not os.path.exists(PLUTUS_SCRIPT_FILE):
        return {"error": "Compiled Plutus script file not found"}
    with open(PLUTUS_SCRIPT_FILE, "r") as f:
        script = f.read()
    return {"plutus_script": script}

@app.get("/deploy-guide")
def get_deployment_guide():
    """ Returns the deployment guide """
    if not os.path.exists(DEPLOYMENT_GUIDE_FILE):
        return {"error": "Deployment guide not found"}
    with open(DEPLOYMENT_GUIDE_FILE, "r") as f:
        guide = f.read()
    return {"deployment_guide": guide}

@app.get("/test-framework")
def get_testing_framework():
    """ Returns the testing framework steps """
    if not os.path.exists(TESTING_FRAMEWORK_FILE):
        return {"error": "Testing framework guide not found"}
    with open(TESTING_FRAMEWORK_FILE, "r") as f:
        guide = f.read()
    return {"testing_framework": guide}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
