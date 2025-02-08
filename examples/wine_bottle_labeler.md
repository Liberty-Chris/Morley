# Winery Labeler with Blockchain Verified Maintenance

This document outlines a complete implementation of a **bottle labeling machine** that interacts with a **Plutus smart contract** on **Hydra** to ensure maintenance records are immutable and verifiable.

## 1. Machine Sensors and Conditions

The machine has four critical sensors:

| Sensor | Condition Monitored | Threshold |
|------------|------------------------|--------------|
| **Motor Amperage Sensor** | Detects overload in drive motors | > 15A |
| **Glue Pot Temperature Sensor** | Monitors overheating of glue reservoirs | > 180°C |
| **Airflow Sensor** | Detects air filter clogging | < 50% airflow |
| **Service Reset Button** | Confirms maintenance completed | Manual Trigger |

- The machine periodically sends data to the **Hydra Head**, where the **Plutus contract verifies conditions**.
- If any condition is exceeded, a **blockchain transaction is submitted**, logging an issue.
- If everything is normal, the machine continues operating.

## 2. Ladder Logic for Machine Operation

```ladder
INPUT MOTOR_AMP
INPUT GLUE_TEMP
INPUT AIRFLOW
INPUT SERVICE_RESET

> MOTOR_AMP 15A MOTOR_OVERLOAD
> GLUE_TEMP 180C GLUE_OVERHEAT
< AIRFLOW 50% AIRFLOW_CLOGGED

OR MOTOR_OVERLOAD GLUE_OVERHEAT AIRFLOW_CLOGGED MACHINE_ERROR
OUTPUT MACHINE_STOP MACHINE_ERROR

NO MACHINE_ERROR
OUTPUT MACHINE_RUN

AND SERVICE_RESET MACHINE_ERROR
RESET MACHINE_ERROR
```

### How it Works
- If any sensor triggers an issue, the machine stops and logs it.
- If no issues exist, the machine runs normally.
- The winery must confirm maintenance via the blockchain before the machine can reset and resume.

## 3. LadderCore IR Representation

```json
{
  "instructions": [
    { "type": "INPUT", "args": ["MOTOR_AMP"] },
    { "type": "INPUT", "args": ["GLUE_TEMP"] },
    { "type": "INPUT", "args": ["AIRFLOW"] },
    { "type": "INPUT", "args": ["SERVICE_RESET"] },
    { "type": ">", "args": ["MOTOR_AMP", "15A", "MOTOR_OVERLOAD"] },
    { "type": ">", "args": ["GLUE_TEMP", "180C", "GLUE_OVERHEAT"] },
    { "type": "<", "args": ["AIRFLOW", "50%", "AIRFLOW_CLOGGED"] },
    { "type": "OR", "args": ["MOTOR_OVERLOAD", "GLUE_OVERHEAT", "AIRFLOW_CLOGGED", "MACHINE_ERROR"] },
    { "type": "OUTPUT", "args": ["MACHINE_STOP", "MACHINE_ERROR"] },
    { "type": "NO", "args": ["MACHINE_ERROR"] },
    { "type": "OUTPUT", "args": ["MACHINE_RUN"] },
    { "type": "AND", "args": ["SERVICE_RESET", "MACHINE_ERROR"] },
    { "type": "RESET", "args": ["MACHINE_ERROR"] }
  ]
}
```

## 4. Plutus Haskell Smart Contract

```haskell
{-# INLINABLE validate #-}
validate :: BuiltinData -> BuiltinData -> ScriptContext -> Bool
validate datum redeemer ctx =
    let txInfo = scriptContextTxInfo ctx
        motorAmp = findDatum "MOTOR_AMP" datum
        glueTemp = findDatum "GLUE_TEMP" datum
        airflow = findDatum "AIRFLOW" datum
        serviceReset = findDatum "SERVICE_RESET" redeemer
    in
    traceIfFalse "Motor overload detected" (motorAmp <= 15) &&
    traceIfFalse "Glue pot overheated" (glueTemp <= 180) &&
    traceIfFalse "Air filter clogged" (airflow >= 50) ||
    traceIfFalse "Maintenance not confirmed" (serviceReset == True)

script :: PlutusScript
script = mkValidatorScript $$(PlutusTx.compile [|| validate ||])
```

## 5. Plutus Core Output (Deployable Smart Contract)

```plutus
(program 1.0.0
    [
        (validate
            (lambda (datum redeemer ctx)
                (let ((txInfo (scriptContextTxInfo ctx)))
                    (and
                        (traceIfFalse "Motor overload detected" (MOTOR_AMP txInfo <= 15))
                        (traceIfFalse "Glue pot overheated" (GLUE_TEMP txInfo <= 180))
                        (traceIfFalse "Air filter clogged" (AIRFLOW txInfo >= 50))
                        (traceIfFalse "Maintenance not confirmed" (SERVICE_RESET redeemer == True))
                    )
                )
            )
        )
    ]
)
```

## 6. Hydra Interaction: Machine Submitting Data

### Machine Sends Sensor Data
```json
{
  "inputs": {
    "MOTOR_AMP": 16,
    "GLUE_TEMP": 190,
    "AIRFLOW": 40
  }
}
```

### Hydra Contract Response
```json
{
  "status": "FAIL",
  "message": "Motor overload detected, Glue pot overheated, Air filter clogged"
}
```

### Winery Submits Maintenance Confirmation
```json
{
  "inputs": {
    "SERVICE_RESET": true
  }
}
```

### Hydra Contract Response
```json
{
  "status": "OK",
  "message": "Maintenance verified, machine may resume"
}
```

## 7. Full System Flow

1. Machine reads sensor data.
2. Submits data to Hydra.
3. Hydra contract verifies conditions.
4. If issue detected, machine stops and logs issue.
5. Winery performs maintenance.
6. Winery submits proof to Hydra.
7. Contract confirms reset.
8. Machine resumes operation.

## Why This Works Well on Hydra

- Instant processing without main-chain delays.
- Scalability for thousands of machine interactions per second.
- Cost-efficiency, reducing blockchain fees.
- Secure and immutable machine operation records.

This system:
- Ensures machines cannot ignore maintenance.
- Provides tamper proof maintenance logs.
- Enables real time automation with Hydra.
- Makes blockchain integrated industrial automation possible.

