import unittest
import json
from plutusladder_api import compile_validator_ir, validate_transaction

class TestPlutusLadder(unittest.TestCase):

    def setUp(self):
        # Load a sample Validator IR for testing
        with open("test/sample_validator_ir.json", "r") as f:
            self.validator_ir = json.load(f)

    def test_compile_validator_ir(self):
        # Test if the IR compiles into a Plutus script
        compiled_script = compile_validator_ir(self.validator_ir)
        self.assertTrue(compiled_script.startswith("program"), "Compilation failed")

    def test_validate_transaction(self):
        # Simulate a valid transaction and check validation logic
        transaction = {
            "inputs": {
                "ORE_FEED": 520,
                "REACTOR_TEMP": 710,
                "PURITY": 99.7
            }
        }
        result = validate_transaction(transaction)
        self.assertEqual(result["status"], "SUCCESS", "Transaction validation failed")

if __name__ == "__main__":
    unittest.main()
