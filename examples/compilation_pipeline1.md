# Example: Ladder Logic to Plutus Core

This document provides a **step by step transformation** of a Ladder Logic program into a **Plutus Core** smart contract. This serves as a reference for how Morley compiles **Ladder Logic** into **on-chain Cardano smart contracts**.

---

## 1. Raw Ladder Logic Input

```ladder
INPUT X1
NC X2
NO X3
AND X4
OR X5
OUTPUT Y1
SET M1
RESET M2
TON T1 2000
TOF T2 1500
TP T3 1000
CTU C1 10
CTD C2 5
ADD R1 50 25
SUB R2 100 20
MUL R3 8 9
DIV R4 81 9
MOD R5 14 5
MOV R6 250
> R1 60
< R2 75
== R3 72
!= R4 9
SR L1
RS L2
JMP L3
CALL FUNC2
RET
FB ConveyorControl X1 X5
```

This Ladder Logic program includes:
- Boolean logic gates (NC, NO, AND, OR)
- Timers (TON, TOF, TP)
- Counters (CTU, CTD)
- Math operations (ADD, SUB, MUL, DIV, MOD, MOV)
- Comparisons (> < == !=)
- Set/Reset Latches (SR, RS)
- Jump and function calls (JMP, CALL, RET, FB)

---

## 2. Parsing Ladder Logic to IR

The parser converts the raw Ladder Logic into a structured **LadderCore IR** format. This intermediate representation ensures that all elements are correctly mapped for further compilation.

```json
{
  "instructions": [
    {"type": "INPUT", "args": ["X1"]},
    {"type": "AND", "args": ["X4"]},
    {"type": "OR", "args": ["X5"]},
    {"type": "OUTPUT", "args": ["Y1"]}
  ],
  "timers": {
    "T1": {"type": "TON", "duration": "2000"},
    "T2": {"type": "TOF", "duration": "1500"},
    "T3": {"type": "TP", "duration": "1000"}
  },
  "counters": {
    "C1": {"type": "CTU", "preset": "10"},
    "C2": {"type": "CTD", "preset": "5"}
  }
}
```

---

## 3. Plutus Haskell Output

```haskell
{-# INLINABLE validate #-}
validate :: BuiltinData -> BuiltinData -> ScriptContext -> Bool
validate _ _ ctx =
    let txInfo = scriptContextTxInfo ctx
    in 
    traceIfFalse "Condition 0 failed: input" (['X1'] txInfo) &&
    traceIfFalse "Condition 1 failed: and" (['X4'] txInfo) &&
    traceIfFalse "Condition 2 failed: or" (['X5'] txInfo) &&
    traceIfFalse "Condition 3 failed: output" (['Y1'] txInfo)

script :: PlutusScript
script = mkValidatorScript $$(PlutusTx.compile [|| validate ||])
```

---

## 4. Plutus Core Output (Final On-Chain Script)

```plutus
(program 1.0.0
    [
        (validate
            (lambda (_ _ ctx)
                (let ((txInfo (scriptContextTxInfo ctx)))
                    (and
                        (traceIfFalse "Condition 0 failed: input" (X1 txInfo))
                        (traceIfFalse "Condition 1 failed: and" (X4 txInfo))
                        (traceIfFalse "Condition 2 failed: or" (X5 txInfo))
                        (traceIfFalse "Condition 3 failed: output" (Y1 txInfo))
                    )
                )
            )
        )
    ]
)
```

---

## Summary of the Pipeline

| Step | Description |
|------|------------|
| 1. Ladder Logic | Raw PLC-based logic designed for automation. |
| 2. Parsing | Converts Ladder Logic into a structured IR format. |
| 3. Plutus Haskell | Validator script enforcing Ladder Logic conditions using Haskell based Plutus contracts. |
| 4. Plutus Core | Fully compiled smart contract deployable on Cardano’s blockchain. |




