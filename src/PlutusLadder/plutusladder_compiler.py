"""
PlutusLadder Compiler (PLC) - Enhanced
Transforms LadderCore IR into valid Plutus Haskell and Plutus Core (PLC) with structured validation logic.
"""

import json

def compile_ir_to_plutus_haskell_enhanced(ir_data):
    """
    Converts LadderCore IR into a structured Plutus Haskell script with improved validation logic.
    """
    if not isinstance(ir_data, dict) or "instructions" not in ir_data:
        raise ValueError("Invalid IR format")

    haskell_script = """{-# INLINABLE validate #-}
validate :: BuiltinData -> BuiltinData -> ScriptContext -> Bool
validate _ _ ctx =
    let txInfo = scriptContextTxInfo ctx
    in """

    grouped_conditions = []

    for i, instruction in enumerate(ir_data["instructions"]):
        if isinstance(instruction, dict):
            inst_type = instruction["type"].lower()
            grouped_conditions.append(f'traceIfFalse "Condition {i} failed: {inst_type}" ({instruction["args"]} txInfo)')

    haskell_script += "    " + " &&\n    ".join(grouped_conditions) + """

script :: PlutusScript
script = mkValidatorScript $$(PlutusTx.compile [|| validate ||])
"""

    return haskell_script
