# **![alt text](https://raw.githubusercontent.com/Liberty-Chris/Morley/refs/heads/main/images/morley_backdrop2.png)Morley: Ladder Logic Smart Contracts**

## **Abstract**

Morley is a domain specific language (DSL) designed to bridge the gap between industrial automation and blockchain technology. By enabling Ladder Logic, a widely used programming paradigm in industrial control systems, to compile directly to Plutus Core, Morley brings automation logic onto the Cardano blockchain.

This innovation empowers engineers, developers, and IoT specialists to leverage secure, transparent, and decentralized execution for industrial applications, logistics, energy management, and decentralized finance. Morley introduces ArkWriter, a graphical Ladder Logic editor, and a robust compilation pipeline, making blockchain based automation as intuitive as programming a PLC. The entire world runs on Ladder Logic. Morley gives it a pathway into blockchain.

### **Key Benefits**

* **Seamless Transition for Engineers** – Morley allows industrial engineers to write smart contracts without learning a new programming language.  
* **Secure and Transparent Execution** – All logic is executed on Cardano’s deterministic and auditable blockchain infrastructure.  
* **Plug-and-Play Integration** – ArkWriter provides an intuitive, visual programming environment for both Ladder Logic and blockchain development.  
* **Cost-Optimized Smart Contracts** – The PlutusLadder Compiler ensures efficient, low cost execution on-chain.  
* **Broad Industry Applications** – Enables machine driven DeFi, supply chain automation, IoT integration, and decentralized industrial logic.

By extending Ladder Logic into blockchain powered automation, Morley simplifies trustless machine-to-machine transactions, automated compliance enforcement, and transparent audit trails, paving the way for a new era of decentralized industrial systems.

## **Introduction**

Ladder Logic has long been the standard for programming Programmable Logic Controllers (PLCs), which are integral to industrial automation. However, traditional PLCs operate in siloed environments, limiting transparency, verifiability, and interoperability with external systems. Blockchain technology offers a decentralized, trustless infrastructure that enhances automation through immutability, security, and transparent execution.

Morley was created to unify these paradigms, allowing engineers and developers to leverage their existing Ladder Logic expertise to build decentralized applications (dApps) on Cardano. By compiling Ladder Logic directly into Plutus Core, Morley ensures that industrial automation workflows can execute deterministically within the blockchain environment, guaranteeing consistency and security in machine driven operations.[1](#1) 

### **Ensuring Deterministic Execution**

A key challenge in bringing automation logic on-chain is ensuring deterministic execution, where outcomes remain consistent across all validating nodes in a decentralized network. Morley addresses this by leveraging Cardano’s Extended UTXO (eUTxO) model, ensuring that Ladder Logic smart contracts execute reliably, without state conflicts or unexpected behavior.[2](#2)

![alt text](https://raw.githubusercontent.com/Liberty-Chris/Morley/refs/heads/main/images/trad_vs_morley.png)

* **State Consistency** – Unlike traditional PLCs that rely on local execution and state retention, Morley ensures that all logic transitions are reproducible on-chain, eliminating the risk of conflicting state changes.  
* **Finality Guarantees** – Transactions are finalized deterministically, meaning once a contract executes, its state cannot be altered retrospectively. This eliminates common race conditions and indeterminate states found in off-chain automation.[3](#3) 
* **Parallel Execution Efficiency** – Using Cardano’s eUTxO model, Morley smart contracts can process multiple machine events in parallel without encountering conflicts, ensuring high reliability in industrial applications.  
* **Resource Optimization** – The PlutusLadder Compiler (PLC) optimizes Ladder Logic execution to minimize smart contract costs, making on-chain automation financially viable for real world use cases.

### **Leveraging Cardano’s Scaling Solutions**

As Morley expands its capabilities, Cardano’s Layer 2 (L2) and sidechain solutions can further enhance scalability, throughput, and cost efficiency for industrial and IoT applications:

* **Hydra for High-Throughput Execution** – Morley smart contracts can operate within Hydra heads, enabling low latency, high frequency automation logic that executes off-chain while retaining security guarantees on Cardano's L1. This is ideal for real time factory automation, IoT device interactions, and energy grid management.[4](#4) 
* **Midgard for Computational Efficiency** – Off-chain computing frameworks like Midgard can allow Morley to process complex industrial workflows off-chain and submit only final state changes to the blockchain, significantly reducing transaction load and execution costs.[5](#5) 
* **Sidechains for Enterprise & Cross-Chain Integration** – Custom Cardano sidechains and partner chains (such as Milkomeda or Midnight) can extend Morley’s functionality by providing private execution environments, interoperability with non-Cardano systems, and regulatory compliance for enterprise adoption.[6](#6) [7](#7)

 ![alt text](https://raw.githubusercontent.com/Liberty-Chris/Morley/refs/heads/main/images/morley_hydra.png)

### **Extending Industrial Automation to Blockchain**

By integrating Ladder Logic with blockchain, Morley enables:

* Trustless machine-to-machine transactions without intermediaries.  
* Automated compliance enforcement using verifiable smart contracts.  
* Transparent audit trails for industrial processes, ensuring accountability and traceability.

The Morley ecosystem includes ArkWriter, a graphical Ladder Logic editor tailored for blockchain automation, and a robust compilation pipeline that seamlessly transforms Ladder Logic programs into Plutus Core smart contracts.

## **Morley Components**

Morley is composed of several integrated components that collectively enable the transformation of Ladder Logic into executable smart contracts on Cardano. Each component plays a distinct role in ensuring compatibility, efficiency, and usability within industrial automation and decentralized applications.

### **LadderCore: Intermediate Representation (IR)**

LadderCore serves as the intermediate representation (IR) for Ladder Logic programs within Morley. It provides a structured format that preserves the logical constructs of Ladder Logic while making them suitable for transformation into Plutus Core.

* Represents traditional Ladder Logic elements such as contacts, coils, timers, and counters.  
* Ensures state transitions and logic conditions remain intact throughout compilation.  
* Enables analysis and optimization before final smart contract deployment.

**Example LadderCore Representation:**

```
{
  "rungs": [
    {
      "inputs": ["X1"],
      "outputs": ["Counter1"],
      "logic": "AND"
    },
    {
      "inputs": ["Counter1", "X2"],
      "outputs": ["TX_Send"],
      "logic": "AND"
    }
  ]
}
```

### **LL-Parser:** Ladder Logic to IR Conversion

The LL-Parser is responsible for converting raw Ladder Logic programs into LadderCore IR. This step ensures that Ladder Logic, originally designed for PLCs, can be seamlessly adapted for blockchain execution.

* Parses standard Ladder Logic syntax and converts it into a structured, machine readable format.

* Identifies potential errors and logical inconsistencies before further processing.

* Standardizes Ladder Logic constructs to ensure compatibility with Morley’s execution model.

**The LL-Parser supports:**

* **Boolean Logic** (Contacts & Coils)  
* **Timers** (On-Delay, Off-Delay, Pulse)  
* **Counters** (Up, Down, Up/Down)  
* **Arithmetic Operations** (+, \-, \*, /, MOD)  
* **Comparators** (\<, \>, \=, \!=, \>=, \<=)  
* **Set/Reset Latches**  
* **Memory Registers**  
* **Blockchain Specific Actions** (e.g., Smart Contract Calls)

**Example LL-Parser Conversion:**

```
X1   --[ ]----------------( )-- Counter1 
X2   --[ ]----------------( )-- Counter2 

Counter1 == 100  --[ ]--( )-- TX_Send
Counter2 == 0    --[ ]--( )-- TX_Send
```

### **PlutusLadder Compiler (PLC):** IR to Plutus Core

The PlutusLadder Compiler (PLC) transforms LadderCore IR into fully functional Plutus Core smart contracts. This enables Ladder Logic programs to execute within the Cardano blockchain's secure and deterministic environment. The compiler optimizes contract execution for minimal resource consumption, ensuring efficient on-chain operations.

* Maps Ladder Logic conditions and transitions to Plutus validation scripts.  
* Optimizes smart contracts for efficiency and reduced transaction costs.  
* Ensures compliance with Cardano’s eUTxO model for conflict free execution.

**Example Compiled Plutus Core Output:**

```
data Action = Counter1 | Counter2 | TX_Send deriving (Show, Eq)
validate :: Action -> Bool
validate Counter1 = True
validate Counter2 = True
validate TX_Send = Counter1 == 100 || Counter2 == 0
```

## **Overview of the Compilation Pipeline**
![alt text](https://raw.githubusercontent.com/Liberty-Chris/Morley/refs/heads/main/images/compiler_pipeline.png)
The **PlutusLadder Compiler (PLC)** transforms **LadderCore IR** into **Plutus Core** smart contracts, enabling deterministic execution on Cardano's blockchain. The compilation pipeline consists of the following key stages:

**1\. Parsing & IR Generation**

*  Ladder Logic input is parsed into **LadderCore IR**, maintaining rungs, contacts, coils, and logic operations.

*  The IR ensures a one-to-one mapping of traditional Ladder Logic elements into an intermediate format suitable for conversion into Plutus Core.

**2\. Logic Optimization & State Analysis**

*  **Dead code elimination**: Removes unreachable logic rungs.

*  **Logic simplification**: Reduces redundant operations (e.g., X AND X \= X).

* **State conflict resolution**: Identifies mutually exclusive ladder states to prevent logic errors in Plutus execution.

**3\. Plutus Core Conversion & Smart Contract Structuring**

*  Inputs are mapped to Plutus redeemers (e.g., Timer \== 10 → Redeemer: TimerTrigger).

*  Coils & outputs are translated into state changes within UTxOs.

*  Conditional logic is mapped into Plutus validation scripts, ensuring transaction inputs meet predefined Ladder Logic conditions.

**4\. Script Optimization for Cost Efficient Execution**

*  Inlining frequently used logic to reduce script size.

*  Reducing memory footprint by converting nested expressions into a flat execution structure.

*  Minimizing ExUnits (Cardano’s computation & memory cost metric) by pre-calculating deterministic paths where possible.

**5\. Final Compilation & On-Chain Deployment**

*  The final Plutus Core script is bundled with datum (state storage) and redeemers (triggers for execution).

*  The Plutus script is deployed, allowing Ladder Logic-based automation to run within Cardano's smart contract framework.

**Examples: Compiling Simple Ladder Logic Programs**

Let’s consider a basic Ladder Logic program and examine how it compiles through the pipeline.

```
[ X1 ] ----( )---- Y1  // If input X1 is active, output Y1 is triggered.
```

**Step 1: LadderCore IR Representation**

```
{
  "inputs": ["X1"],
  "outputs": ["Y1"],
  "logic": [
    { "if": "X1", "then": "Y1 = ON" }
  ]
}
```

**Step 2: Plutus Core Conversion**

```
{-# INLINABLE validate #-}
validate :: Input -> ScriptContext -> Bool
validate input ctx = case input of
    "X1" -> traceIfFalse "Invalid state" (outputEquals ctx "Y1" True)

{-# INLINABLE outputEquals #-}
outputEquals :: ScriptContext -> String -> Bool -> Bool
outputEquals ctx key val = case findDatum key ctx of
    Just v  -> v == val
    Nothing -> False
```

This process ensures that Ladder Logic automation logic is secure, deterministic, and optimized for execution on Cardano’s blockchain.  

**Example 2:**
```
X1  --[ ]------------( )-- Counter1

X2  --[ ]------------( )-- Counter2



Counter1 == 100  --[ ]--( )-- TX_Send

Counter2 == 0    --[ ]--( )-- TX_Send
```


This translates into Plutus Core as:
```
{-# INLINABLE validate #-}

validate :: Action -> Bool

validate Counter1 = True

validate Counter2 = True

validate TX_Send  = Counter1 == 100 || Counter2 == 0
```
**State Mapping and Execution Validation**

### In the previous example:

* ```X1``` and ```X2``` are mapped to redeemers (triggers).

* ```Counter1``` and ```Counter2``` store state as datums in UTxOs.

* ```TX\_Send``` execution is validated based on the counter values.

## **Optimization Techniques for Cost Efficient Execution**

The **PlutusLadder Compiler** is designed to minimize execution costs while maintaining deterministic execution. Key optimization strategies include:

* **Script Inlining** – Frequently used Ladder Logic rungs are precomputed to reduce on-chain execution costs.

* **Logic Reduction** – AND/OR expressions are optimized to eliminate redundant checks.

* **ExUnit Minimization** – Reducing Plutus script size ensures lower transaction fees.

* **Efficient Storage Model** – Only essential machine states are stored in UTxOs, reducing on-chain data costs.

## **Security Considerations**

### To ensure safe execution, the compiler prevents:

* **State Conflicts** – Detects and prevents conflicting ladder rungs from triggering simultaneously.

* **Re-Entrancy Risks** – Ensures smart contracts cannot be manipulated mid execution.

* **Invalid Transitions** – Blocks transactions that violate expected PLC logic flow.

### **Ensuring Deterministic Execution in Morley**

Deterministic execution is crucial for automation and blockchain based logic, ensuring that every contract execution produces the same result across all network nodes. Morley achieves deterministic execution guarantees by leveraging Cardano’s eUTxO model and formal verification principles within the Plutus smart contract environment.

### **Handling State Consistency in Smart Contracts**

Traditional PLCs operate on continuously running state machines, whereas blockchain execution is transaction based. To maintain state consistency, Morley implements:

* **UTxOs as Immutable State Containers** – Instead of using mutable state, Morley stores machine state in UTxOs, ensuring that each transaction represents a well defined, non conflicting state update.

* **Sequential Execution of Ladder Logic Rungs** – Execution follows a scan cycle model, where logic is evaluated in order. Morley preserves this order using structured Plutus scripts that enforce sequential validation rules.

* **State Rollback Prevention** – Since Cardano transactions are atomic, once a Ladder Logic condition is met and executed, it cannot be reversed, ensuring finality and deterministic state updates.

### **Preventing Conflicts in Parallel Execution**

In industrial automation, multiple Ladder Logic rungs may execute in parallel. However, blockchain transactions must be processed in a deterministic order to prevent conflicts. Morley ensures safe concurrent execution by:

* **Partitioning Machine States into Independent UTxOs** – This prevents one system component from interfering with another, enabling independent automation processes.

* **Using Hydra for High Throughput Processing** – Multiple Ladder Logic contracts can execute simultaneously within a Hydra head, allowing instant validation off-chain while maintaining state consistency on-chain.

* **Optimized Transaction Ordering** – Transactions modifying the same machine state are batched and processed deterministically, preventing double execution or race conditions.

### **Handling Asynchronous Events & Timer Based Logic**

Many industrial processes rely on time based triggers (e.g., a motor must start five seconds after a sensor detects input). Since blockchain transactions do not continuously track real world time, Morley implements:

* **Time Locked Transactions** – Timer based conditions are enforced through smart contract constraints, ensuring execution occurs only after a minimum slot time.

* **Event Driven Execution via Oracles** – External triggers (such as sensor inputs) are fed into Morley smart contracts via oracles, ensuring that off-chain events are accurately captured.

* **Stateful Timer Emulation** – Morley compiles Ladder Logic timers (e.g., On-Delay, Off-Delay) into Plutus scripts, ensuring the correct temporal behavior.

### **Finality & Immutable State Updates**

Unlike traditional PLCs, which continuously update internal states, Morley ensures that every state transition is immutable once committed to the blockchain:

* **Transaction Finality in the eUTxO Model** – Once a Plutus script executes, it cannot be reversed, preventing rollback errors.

* **Explicit State Commitments** – Every Morley-based transaction explicitly commits a new state, rather than mutating an existing one, ensuring a clear audit trail.

* **Deterministic Execution Across Nodes** – Each Morley Ladder Logic program executes identically on all Cardano nodes, ensuring network wide consistency.

###  **PlutusLadderSim (PLS):** Smart Contract Simulation and Testing

The PlutusLadder Simulator in ArkWriter provides a sandbox testing environment for Ladder Logic smart contracts before on-chain deployment. It allows users to simulate execution, debug logic, and verify on-chain behavior without incurring transaction fees.

* Allows developers to verify contract behavior using simulated machine inputs and outputs.  
* Detects potential execution errors and inefficiencies prior to blockchain interaction.  
* Provides debugging tools to refine contract logic and improve performance.

**Example Simulation Output:**

```
{
  "timestamp": "2024-09-12T12:06:21Z",
  "input": "Counter1 = 100",
  "output": "TX_Send Triggered"
}
```

## **ArkWriter:** Graphical Editor for Blockchain Based Ladder Logic 

![alt text](https://raw.githubusercontent.com/Liberty-Chris/Morley/refs/heads/main/images/arkwriter.png)

ArkWriter serves as the graphical user interface (GUI) for Morley, enabling engineers and developers to design, simulate, and deploy Ladder Logic smart contracts on Cardano’s blockchain. It provides a drag and drop interface for creating Ladder Logic diagrams, which are then converted into Plutus smart contracts.

ArkWriter is built on a fork of OpenPLC, a widely used open source PLC runtime. This integration allows seamless adaptation of existing industrial automation workflows into Morley’s blockchain powered execution model.[8](#8)

### **ArkWriter Architecture & System Design**

ArkWriter is composed of three main layers, each designed to facilitate the transition of Ladder Logic into blockchain based smart contracts.

### **Frontend (User Interface)**

ArkWriter extends OpenPLC’s GUI to include blockchain automation capabilities while maintaining familiar design principles for engineers .

* **Graphical Ladder Logic Design** – Engineers can create Ladder Logic programs using predefined components such as contacts, coils, timers, and counters.  
* **Live Execution Visualization** – Users can simulate state changes and observe how their Ladder Logic contracts will behave before deployment.  
* **Integrated Code Editor** – While ArkWriter is primarily a visual tool, it includes a direct IR (LadderCore) editing feature for advanced users who prefer code based modifications.

### **Backend (Logic Processing & Compilation)**

The backend of ArkWriter extends OpenPLC’s execution engine, ensuring compatibility with blockchain-based automation.

* **Ladder Logic Parsing & Validation** – Ensures correctness by verifying logical consistency and state dependencies before compilation.  
* **Integration with LL-Parser** – Converts Ladder Logic diagrams into LadderCore IR, which is processed by the PlutusLadder Compiler.  
* **Smart Contract Deployment API** – Communicates with Morley’s backend to compile Ladder Logic programs into deployable Plutus scripts.  
* **Simulation Engine** – Enables users to test Ladder Logic execution in a sandboxed environment, ensuring blockchain compatibility before deployment.

### **Blockchain Integration & Smart Contract Execution**

ArkWriter connects directly with the Cardano blockchain to deploy and monitor smart contracts.

* **Cardano Wallet Integration** – Users can connect their Cardano wallet (e.g., Lace, Eternl, Vespr, Begin, Gero) for on-chain contract deployment.  
* **Plutus Smart Contract Generation** – Converts validated Ladder Logic into Plutus Core scripts for execution on Cardano.  
* **On-Chain Monitoring & Execution Logs** – Users can track real time execution results directly within ArkWriter.

## **ArkWriter’s Role in Smart Contract Deployment**

ArkWriter simplifies the process of converting Ladder Logic into Plutus based smart contracts through the following workflow:

1. **Graphical Ladder Logic Design** – Users create automation logic using ArkWriter’s drag and drop interface.  
2. **IR Conversion** – ArkWriter translates the design into LadderCore IR, the intermediate representation of Ladder Logic.  
3. **Compilation with PlutusLadder Compiler** – The IR is converted into Plutus Core smart contracts.  
4. **Smart Contract Deployment** – Users deploy contracts directly to Cardano via wallet integration.  
5. **Simulation & Debugging** – Before deployment, users can simulate contract execution in a test environment.

## **ArkWriter’s Extensibility & Future Integrations**

ArkWriter is designed to be modular and extensible, ensuring compatibility with evolving industrial automation requirements.

* **OpenPLC Compatibility** – Maintains backward compatibility with existing industrial automation workflows, making it easier for factories and engineers to transition to blockchain automation.  
* **Support for PLC Communication** – Future updates will include Modbus, MQTT, and OPC-UA support, enabling seamless communication with industrial machines.  
* **Custom Ladder Logic Modules** – Developers will be able to extend ArkWriter with additional Ladder Logic components, such as advanced timers, state machines, and conditional execution structures.  
* **Multi User Collaboration** – Planned features include version control and shared Ladder Logic projects for collaborative automation development.

##  **Compatibility Considerations for Siemens, Rockwell, and Other PLC Systems**

### **Introduction**

Morley is designed to bridge the gap between traditional PLC based automation and blockchain smart contracts. While Morley is built on a fork of OpenPLC, making it compatible with standard Ladder Logic, integrating with proprietary industrial automation ecosystems like Siemens (TIA Portal) and Rockwell Automation (Allen-Bradley RSLogix/Studio 5000\) presents unique challenges. This section explores potential compatibility pathways and limitations when working with Siemens, Rockwell, Mitsubishi, and other PLC brands.

### **Opportunities for Integration**

#### **Ladder Logic Standardization & IEC 61131-3 Compliance**

Most major PLC systems adhere to the IEC 61131-3 standard, which defines five PLC programming languages:

* **Ladder Diagram (LD)** – Already supported by Morley.  
* **Structured Text (ST)** – Potential for mapping advanced logic to Plutus Core.  
* **Function Block Diagram (FBD)** – Could be integrated into ArkWriter in the future.  
* **Sequential Function Chart (SFC)** – Some compatibility challenges remain.  
* **Instruction List (IL)** – Deprecated but still used in legacy systems.

**Morley’s Approach:** Ensure Morley’s Ladder Logic follows IEC 61131-3 syntax to facilitate cross compatibility with industrial PLC systems.[9](#9)

#### **Direct PLC Integration via Standard Communication Protocols**

Many industrial PLCs use standardized communication protocols to interface with external systems. ArkWriter, built on OpenPLC’s backbone, can leverage the following protocols for data exchange with Siemens, Rockwell, and other PLCs:

* **Modbus TCP/IP & RTU** – Used across Siemens, Rockwell, ABB, Schneider Electric.  
* **EtherNet/IP** – Rockwell/Allen-Bradley native protocol.  
* **Profinet & Profibus** – Siemens and Beckhoff communication protocols.  
* **OPC UA** – Universal protocol for industrial automation & IIoT.

**Morley’s Approach:** By integrating OPC UA, Modbus, and EtherNet/IP, Morley can read/write machine state data from Siemens, Rockwell, and Mitsubishi PLCs, allowing smart contracts to interact with existing automation infrastructure.

### **Key Limitations & Challenges**

#### **Proprietary Ecosystems & Licensing Restrictions**

* Siemens (TIA Portal) and Rockwell (RSLogix/Studio 5000\) are proprietary ecosystems with closed, licensed compilers.  
* These PLCs do not support external execution environments, making it impossible to run Morley smart contracts inside their firmware.

**Workaround:** Instead of attempting direct execution on these PLCs, Morley can run on an external edge device that communicates with PLCs via Modbus, OPC UA, or MQTT.

#### **Real-Time Execution vs Blockchain Finality**

* Industrial PLCs require real time execution with millisecond response times.  
* Blockchain execution (Plutus smart contracts) introduces delays due to transaction validation.

**Workaround:** Use Hydra heads or off-chain logic processing (Midgard) to enable low latency execution while committing only finalized states on-chain.

#### **Conversion of Rockwell & Siemens Ladder Logic to Morley**

* **Vendor Specific Ladder Logic Syntax:** Siemens (TIA Portal) and Rockwell (RSLogix) use unique syntax that is not directly compatible with OpenPLC or Morley’s LL-Parser.  
* **Example Differences:**  
  * Rockwell RSLogix uses XIC (Examine If Closed) and XIO (Examine If Open), whereas Morley and OpenPLC use traditional `[ ]` contacts.  
  * Siemens TIA Portal structures Ladder Logic in Networks rather than traditional rungs.

**Workaround:** Develop syntax converters that translate Siemens/Rockwell Ladder Logic into Morley’s LadderCore IR for seamless interoperability.

### **Potential Future Pathways for Compatibility**

To maximize Morley’s adoption in industrial automation, the following future development paths can be explored:

1. **Implement OPC UA, Modbus, and EtherNet/IP** for seamless communication with Siemens, Rockwell, and Mitsubishi PLCs.  
2. **Develop Ladder Logic translators** to convert vendor specific Ladder Logic syntax into Morley compatible code.  
3. **Focus on executing Morley smart contracts on edge devices** that communicate with PLCs rather than running inside them.  
4. **Leverage Hydra or off-chain execution** to improve real time response for industrial automation.

### **Conclusion**

Morley cannot run natively on Siemens, Rockwell, or other proprietary PLCs due to licensing and proprietary compiler restrictions. However, Morley smart contracts can interact with these PLCs via industrial protocols like OPC UA, Modbus, and EtherNet/IP. Future work will focus on bridging Ladder Logic syntax differences and enhancing real time response for industrial automation. By strategically integrating with existing automation infrastructure, Morley can expand blockchain adoption in traditional industrial environments.

## **Use Cases**

Morley extends the applicability of Ladder Logic into blockchain integrated solutions across multiple industries. By providing deterministic execution, transparency, and automation, Morley enables new possibilities for industrial automation, IoT, and decentralized finance.

### **Industrial Automation**

* **PLC Automation –** Enables trustless automation across factory lines without reliance on centralized SCADA systems.  
* **Machine Event Logging & Audit Trails –** Logs machine events immutably on-chain, ensuring compliance and real time traceability.  
* **Predictive Maintenance & Smart Contracts –** Automates maintenance scheduling and service requests based on equipment sensor data.

### **Internet of Things (IoT)**

* **Secure IoT Device Automation –** Connects industrial IoT devices (Raspberry Pi, Arduino, ESP32) with blockchain verified automation workflows.[10](#10) [11](#11)
* **Decentralized Sensor Networks –** Enables real time decision making using trustless sensor data stored on-chain.  
* **Smart Energy Management –** Automates energy trading and grid optimization using blockchain based coordination between devices.

### **Decentralized Finance (DeFi) for Automation**

* **Machine Driven DeFi –** Enables automated staking, lending, and on-chain financial settlements based on industrial performance data.  
* **Insurance Automation –** Utilizes IoT sensor data to trigger blockchain based insurance claims and settlement contracts.  
* **Automated Industrial Payments –** Manages equipment leasing, royalty based revenue sharing, and supplier payment automation using smart contracts.

## **Advanced Applications of Morley in M2M Automation**

### **Introduction**

Morley’s integration of Ladder Logic with blockchain extends beyond traditional PLC based industrial automation. By enabling machine-to-machine (M2M) and remote system-to-remote system interactions on a trustless, decentralized infrastructure, Morley opens new possibilities across manufacturing, logistics, energy, finance, and space exploration. This section explores advanced applications where Morley powered automation drives efficiency, transparency, and autonomy.

![alt text](https://raw.githubusercontent.com/Liberty-Chris/Morley/refs/heads/main/images/m2m_service.png)

### **Decentralized Smart Manufacturing & Digital Twins**

* **Concept:**  
  * Smart factories use Morley based Ladder Logic contracts to autonomously control production lines, robotic arms, and quality assurance processes.  
  * Machines interact autonomously, logging real time operational data immutably on Cardano’s blockchain for diagnostics, maintenance, and auditing.  
* **Why Blockchain?**  
  * Eliminates reliance on centralized SCADA systems.  
  * Provides tamper proof logs for compliance and regulatory tracking.  
  * Reduces machine downtime with on-chain fault detection and repair contracts.  
* **Morley’s Role:**  
  * Ladder Logic contracts for autonomous machine execution.  
  * Integration with IoT devices for real time decision making.  
  * Hydra integration for high throughput automation logic.

### **Autonomous Logistics & Supply Chain Validation**

* **Concept:**  
  * Morley powered smart contracts automate customs clearance, verify inventory movements, and trigger payments upon successful delivery.  
  * Industrial sensors and GPS tracking devices record immutable on-chain location and environmental conditions.  
* **Why Blockchain?**  
  * Prevents supply chain fraud and counterfeiting.  
  * Enables trustless supplier verification and automated contract execution.  
  * Reduces reliance on third party logistics software.  
* **Morley’s Role:**  
  * Ladder Logic automation for supply chain validation.  
  * Smart contract powered logistics coordination.  
  * Midgard integration for real time data aggregation before finalizing on-chain events.

### **Blockchain Powered Smart Energy Grid & Automated Trading**

* **Concept:**  
  * Smart meters, solar panels, and EV charging stations autonomously trade excess energy using Morley powered Plutus contracts.  
  * Decentralized energy trading allows users to buy/sell electricity based on real time consumption and production data.  
* **Why Blockchain?**  
  * Eliminates centralized control over energy grids.  
  * Enables peer-to-peer energy trading with verifiable on-chain settlements.  
  * Automates compliance reports for renewable energy usage.  
* **Morley’s Role:**  
  * Ladder Logic smart contracts for grid automation and energy trading.  
  * Hydra integration for low latency, high frequency microtransactions.  
  * On-chain verification of carbon credits and renewable energy generation.

### **Autonomous DeFi for Industrial IoT & Staking Based Operations**

* **Concept:**  
  * IoT connected machines (e.g., mining rigs, industrial robots, or manufacturing plants) autonomously stake, borrow, or lend assets based on real time operational efficiency .  
  * Machines determine financial needs (e.g., spare parts, upgrades) and execute financial transactions accordingly.  
* **Why Blockchain?**  
  * Eliminates centralized intermediaries in machine driven finance.  
  * Ensures real time auditing of machine efficiency before loan disbursement.  
  * Enables automated smart contract insurance for machine failures.  
* **Morley’s Role:**  
  * Ladder Logic contracts for machine governed financial transactions.  
  * Plutus contracts for staking and lending based on real world machine metrics.  
  * Sidechain integration for industrial scale DeFi applications.

### **Space & Remote Systems Automation (Mars Rovers, Satellites, & Drones)**

* **Concept:**  
  * Blockchain enabled coordination for rovers, satellites, and autonomous drones enables secure, decentralized mission control.  
  * Morley based Ladder Logic contracts handle rover movement, sensor readings, and inter device communication without a centralized command hub.  
* **Why Blockchain?**  
  * Ensures secure, immutable communication between remote systems.  
  * Allows missions to continue autonomously, even if a central hub fails.  
  * Creates tamper proof execution logs for scientific research and space exploration.  
* **Morley’s Role:**  
  * Ladder Logic automation for decision making in extreme environments.  
  * Hydra for scalable, high speed execution of remote system interactions.  
  * Blockchain based coordination between autonomous devices.

The Morley framework transforms Ladder Logic from an industrial automation tool into a blockchain powered smart contract language for trustless M2M automation. Whether applied to smart factories, logistics, energy grids, DeFi, or space exploration, Morley offers a secure, deterministic execution environment that decentralizes industries requiring efficiency, security, and transparency. As Cardano’s scaling solutions evolve (Hydra, Midgard, and sidechains), Morley’s impact will expand into high throughput, real time automation, paving the way for next generation decentralized industrial infrastructure.

**Example Cases: Morley Powered Smart Contracts in Action**

This section provides detailed examples of how Morley powered Ladder Logic contracts are used in real world applications. Each example follows a structured format: Ladder Logic design, Intermediate Representation (IR), and Plutus smart contract implementation.

### **Automated Conveyor Belt Control**

#### **Use Case:** Industrial Automation

A conveyor belt system in a smart factory must:

1. Start moving when a proximity sensor (X1) detects an object.  
2. Stop moving when the object reaches the end sensor (X2).  
3. If the object is not detected at X2 within 10 seconds, trigger a safety alarm (Y1).

**This implementation:**

* Demonstrates real time machine control via smart contracts.  
* Ensures deterministic execution for industrial safety compliance.

## **Detailed Ladder Logic to Plutus Smart Contract Example**

This example follows a step by step process, starting from Ladder Logic design, converting it into LadderCore IR, and finally compiling it into a Plutus smart contract.

### **Scenario:** Automated Conveyor Belt Control

A conveyor belt system operates in an automated factory. The belt must:

1. Start moving when a proximity sensor (X1) detects an object.  
2. Stop moving when the object reaches the end sensor (X2).  
3. If the object is not detected at X2 within 10 seconds, trigger a safety alarm (Y1).

### **Step 1: Ladder Logic Diagram**

This is how the Ladder Logic program is structured:

```
X1  --[ ]------------( )-- Motor (Y2)  
X2  --[ ]------------(/)-- Motor (Y2)  
T1  --[ Timer 10s ]--( )-- Alarm (Y1)  
```

* ```X1``` (Proximity Sensor): Starts the motor ```(Y2)```.  
* ```X2``` (End Sensor): Stops the motor ```(Y2)```.  
* ```T1``` (10s Timer): Triggers the alarm ```(Y1)``` if the object does not reach ```X2``` in time.

### **Step 2: LadderCore IR Representation**

After parsing the Ladder Logic diagram, the LadderCore IR (Intermediate Representation) is structured as follows:

```
{
  "inputs": ["X1", "X2"],
  "outputs": ["Y1", "Y2"],
  "logic": [
    { "if": "X1", "then": "Y2 = ON" },
    { "if": "X2", "then": "Y2 = OFF" },
    { "if": "T1 >= 10s", "then": "Y1 = ON" }
  ]
}
```

* The IF-THEN rules define how inputs trigger state changes.  
* The timer condition (```T1 \>= 10s```) ensures the alarm activates if the object takes too long.

### **Step 3: Plutus Core Smart Contract Code**

The PlutusLadder Compiler converts the LadderCore IR into Plutus Core smart contract logic:

```
{-# INLINABLE validate #-}
validate :: Proximity -> ScriptContext -> Bool
validate sensor ctx = case sensor of
    X1 -> traceIfFalse "Start motor" (outputEquals ctx "Y2" True)
    X2 -> traceIfFalse "Stop motor" (outputEquals ctx "Y2" False)
    T1 -> traceIfFalse "Trigger alarm" (elapsedTime ctx >= 10000 && outputEquals ctx "Y1" True)

{-# INLINABLE outputEquals #-}
outputEquals :: ScriptContext -> String -> Bool -> Bool
outputEquals ctx key val = case findDatum key ctx of
    Just v  -> v == val
    Nothing -> False
```

* **`validate`** function: Defines conditions for activating motor (```Y2```) and alarm (```Y1```).  
* Uses Plutus redeemers: **`X1`, `X2`,** and **`T1`** correspond to real world PLC inputs.  
* Ensures deterministic execution: Prevents invalid state transitions.

### **Step 4: Deploying the Smart Contract**

Once compiled, the Plutus script is deployed on Cardano, where:

* The UTxO stores the machine’s current state (e.g., Motor ON/OFF).  
* On-chain transactions update outputs based on sensor triggers.

#### Example Transaction:

```
{
  "redeemer": "X1",
  "datum": { "Y2": "ON" }
}
```

### **Step 5: Validating Smart Contract Execution**

A test transaction is submitted to verify the contract's behavior:

* If ```X1``` is activated, the contract permits the transaction and updates the motor state to ```ON```.  
* If ```X2``` is activated, the contract stops the motor.  
* If 10 seconds pass without ```X2``` activation, the contract triggers the alarm.

#### Results:

* All expected state transitions execute deterministically.  
* Timers function correctly, activating safety mechanisms as required.  
* Plutus enforces valid logic paths, preventing unintended state changes.

### **Machine Driven DeFi for Industrial Lending, Staking & Settlement**

#### **Use Case:** Decentralized Finance (DeFi) for Industrial Systems

A mining company uses Morley to enable:

1. Automated staking when machines operate at optimal efficiency (≥90%).  
2. Automatic loan requests if machines fail or underperform (\<50%).  
3. Loan repayments triggered when efficiency recovers to ≥80%.

This implementation:

* Bridges industrial automation with blockchain based DeFi mechanisms.  
* Creates an autonomous economy where machines manage financial settlements.

This example demonstrates how Morley powered Ladder Logic contracts can be used in Machine Driven DeFi, where industrial machines autonomously stake, borrow, and lend assets based on operational performance data. By integrating blockchain based financial automation, businesses can optimize resource allocation, automate funding for maintenance, and create self sustaining machine economies.

### **Scenario: Autonomous Mining Equipment Staking & Loan System**

A mining company wants to automate its financial operations based on the efficiency of its mining machines. The system must:

1. Stake ADA tokens when a machine operates at optimal efficiency for 24 hours.  
2. Trigger an automatic loan request if a machine fails or underperforms, requiring maintenance funding.  
3. Repay loans automatically when machine output exceeds predefined performance benchmarks.

### **Step 1: Ladder Logic Diagram**

The following Ladder Logic program automates staking and financial actions based on machine data:

```
Machine Efficiency >= 90% --[ ]----( )-- Stake ADA  
Machine Efficiency < 50%  --[ ]----( )-- Request Loan  
Loan Repayment Trigger    --[ ]----( )-- Repay Loan 
```

* ```Machine Efficiency ≥ 90%```: Staking occurs.  
* ```Machine Efficiency \< 50%```: A loan request is triggered.  
* ```Loan Repayment Trigger```: If efficiency recovers, the loan is repaid.

### **Step 2: LadderCore IR Representation**

The Ladder Logic program is translated into LadderCore IR, which structures the conditions and state transitions:

```
{
  "inputs": ["Efficiency"],
  "outputs": ["Stake", "Loan", "Repay"],
  "logic": [
    { "if": "Efficiency >= 90", "then": "Stake = ON" },
    { "if": "Efficiency < 50", "then": "Loan = ON" },
    { "if": "Efficiency >= 80 AND Loan = ON", "then": "Repay = ON" }
  ]
}
```

* The logic ensures that financial actions are triggered based on real time machine performance.  
* If a loan is taken, repayment is only activated once machine efficiency recovers.

### **Step 3: Plutus Core Smart Contract Code**

The PlutusLadder Compiler converts the LadderCore IR into Plutus Core smart contract logic:

```
{-# INLINABLE validate #-}
validate :: MachineState -> ScriptContext -> Bool
validate state ctx = case state of
    Stake -> traceIfFalse "Staking conditions not met" (efficiency ctx >= 90)
    Loan  -> traceIfFalse "Loan request conditions not met" (efficiency ctx < 50)
    Repay -> traceIfFalse "Loan repayment conditions not met" (efficiency ctx >= 80 && loanTaken ctx)

{-# INLINABLE efficiency #-}
efficiency :: ScriptContext -> Integer
efficiency ctx = case findDatum "Efficiency" ctx of
    Just v  -> v
    Nothing -> 0

{-# INLINABLE loanTaken #-}
loanTaken :: ScriptContext -> Bool
loanTaken ctx = case findDatum "Loan" ctx of
    Just True  -> True
    _          -> False
```

* Machines can only stake if efficiency is high (≥90%).  
* Loan requests trigger only if efficiency is critically low (\<50%).  
* Loans must be repaid once machine performance recovers (≥80%).

### **Step 4: Deploying the Smart Contract**

Once compiled, the Plutus script is deployed, and the machine interacts with the blockchain as follows:

* If Efficiency ≥ 90%, an on-chain staking transaction is executed.  
* If Efficiency \< 50%, a loan smart contract is triggered.  
* If Efficiency recovers to 80%, the loan repayment contract activates.

#### Example Staking Transaction:

```
{
  "redeemer": "Stake",
  "datum": { "Efficiency": 92 }
}
```

### **Step 5: Validating Execution & On-Chain Automation**

A test transaction is submitted to verify the smart contract’s behavior:

* If Efficiency ≥ 90%, the contract validates staking and executes the transaction.  
* If Efficiency \< 50%, the contract triggers a loan request.  
* If Efficiency recovers to ≥80%, the contract automatically repays the loan.

#### Results:

* Staking occurs only when machines perform optimally.  
* Loans are only taken when underperformance occurs.  
* Repayments happen only when machine output recovers.

### **Smart Factory Quality Assurance & Defect Handling**

#### **Use Case:** Autonomous Quality Control in Manufacturing

A factory assembly line requires:

1. Detecting defective products using high speed cameras.  
2. Activating a robotic arm to remove defective items.  
3. Logging defect data on-chain for regulatory compliance.  
4. Triggering an alert if defect rates exceed 5% within an hour.

This implementation:

* Ensures transparent, tamper proof defect tracking.  
* Automates quality assurance with blockchain backed execution.

## **Automating Quality Assurance with Morley**

This example highlights how Morley powered Ladder Logic contracts can automate quality assurance (QA) processes in smart factories. By integrating blockchain backed automation, the system ensures accurate defect detection, tracking, and resolution, eliminating human error while maintaining immutable production audit trails.

### **Scenario:** Automated Quality Inspection on an Assembly Line

A smart factory producing electronic devices must ensure all units meet quality standards before shipping. The system must:

1. Inspect each unit passing through the QA station using high speed cameras and sensors.  
2. Reject defective products by activating a robotic arm.  
3. Log all inspection data immutably on-chain, ensuring a transparent audit trail for compliance.  
4. Trigger an alert if the defect rate exceeds 5% within 1 hour to indicate potential production issues.

### **Step 1: Ladder Logic Diagram**

The following Ladder Logic program automates quality inspection and defect removal:

```
Sensor_OK  --[ ]----( )-- Conveyor Continue  
Sensor_Defect --[ ]----( )-- Reject Arm  
Defect_Rate > 5% --[ ]----( )-- Production Alert 
```

* ```Sensor\_OK```: Keeps the conveyor moving when the product passes inspection.  
* ```Sensor\_Defect```: Triggers the robotic arm to remove defective units.  
* ```Defect\_Rate \> 5%```: Sends a production alert if too many defects are detected.

### **Step 2: LadderCore IR Representation**

The Ladder Logic program is translated into LadderCore IR, defining the conditions and actions:

```
{
  "inputs": ["Sensor_OK", "Sensor_Defect", "Defect_Rate"],
  "outputs": ["Conveyor", "Reject_Arm", "Production_Alert"],
  "logic": [
    { "if": "Sensor_OK", "then": "Conveyor = ON" },
    { "if": "Sensor_Defect", "then": "Reject_Arm = ON" },
    { "if": "Defect_Rate > 5", "then": "Production_Alert = ON" }
  ]
}
```

* The conveyor only runs if the product passes inspection.  
* The robotic arm activates when a defect is detected.  
* If the defect rate surpasses 5%, an on-chain alert is triggered.

### **Step 3: Plutus Core Smart Contract Code**

The PlutusLadder Compiler converts the LadderCore IR into Plutus Core smart contract logic:

```
{-# INLINABLE validate #-}
validate :: QAState -> ScriptContext -> Bool
validate state ctx = case state of
    Conveyor    -> traceIfFalse "Conveyor conditions not met" (sensorCheck ctx "Sensor_OK")
    Reject_Arm  -> traceIfFalse "Reject conditions not met" (sensorCheck ctx "Sensor_Defect")
    Alert       -> traceIfFalse "Alert conditions not met" (defectRate ctx > 5)

{-# INLINABLE sensorCheck #-}
sensorCheck :: ScriptContext -> String -> Bool
sensorCheck ctx key = case findDatum key ctx of
    Just True  -> True
    _          -> False

{-# INLINABLE defectRate #-}
defectRate :: ScriptContext -> Integer
defectRate ctx = case findDatum "Defect_Rate" ctx of
    Just v  -> v
    Nothing -> 0
```

* Ensures only defect free products continue along the conveyor.  
* Rejects defective units automatically via robotic control.  
* Triggers an on-chain alert if production issues arise.

### **Step 4: Deploying the Smart Contract**

Once compiled, the Plutus script is deployed, enabling real time quality assurance automation:

* If a product passes inspection, the conveyor moves forward.  
* If a product fails, the robotic reject arm removes it.  
* If defects exceed 5%, a blockchain logged alert is triggered.

#### Example Blockchain Transaction:

```
{
  "redeemer": "Reject_Arm",
  "datum": { "Sensor_Defect": true }
}
```

### **Step 5: Validating Execution & Quality Assurance Logging**

A test transaction is submitted to verify the smart contract’s behavior:

* If ```Sensor\_OK``` is activated, the contract validates conveyor movement.  
* If ```Sensor\_Defect``` is activated, the contract validates rejection.  
* If ```Defect Rate \> 5%```, the contract logs a production issue on-chain.

#### Results:

* Defect free products continue on the production line.  
* Rejected units are removed with robotic precision.  
* Blockchain immutably records all quality assurance data.

These examples showcase Morley’s versatility, proving that Ladder Logic based smart contracts can revolutionize industrial automation, DeFi, and machine control. By combining blockchain security with deterministic execution, Morley extends traditional PLC automation into a decentralized, trustless environment.

## **Future Work**

Morley is an evolving project with ambitious milestones aimed at expanding its capabilities and driving adoption across industries. Key areas of future development include:

### **Enhanced ArkWriter Features**

* **Real Time Simulation** – Implementing a live execution environment where engineers can test and visualize Ladder Logic-based smart contracts before deployment.  
* **Smart Contract Deployment Tools** – Streamlining the transition from Ladder Logic programming to blockchain execution with one click Plutus contract deployment.  
* **Drag and Drop Blockchain Logic Blocks** – Expanding ArkWriter’s GUI to include pre configured blockchain automation templates for common use cases.

### **Cross Platform Support**

* **Integration with Mainstream PLC Software** – Expanding compatibility with industrial automation platforms such as Siemens TIA Portal, Rockwell Studio 5000, and Mitsubishi GX Works.  
* **Hardware Compatibility** – Exploring support for industrial grade controllers and edge computing devices, ensuring Morley powered automation can function in real world environments.  
* **Custom Ladder Logic Extensions** – Allowing engineers to create modular, reusable automation components that seamlessly integrate with existing PLC workflows.

### **Enterprise Adoption**

* **Industry Partnerships** – Collaborating with industrial leaders, manufacturers, and automation firms to demonstrate Morley’s real world impact.  
* **Regulatory Compliance & Standards Alignment** – Ensuring Morley smart contracts adhere to industry standards and safety regulations.  
* **Blockchain Backed Supply Chains** – Expanding Morley’s use in supply chain automation, enabling companies to achieve end-to-end product traceability on Cardano.

### **Community Growth & Open Source Development**

* **Encouraging Open Source Contributions** – Engaging developers to expand Morley’s functionality and contribute to its ecosystem.  
* **Educational Initiatives** – Providing comprehensive documentation, tutorials, and developer workshops to onboard new users.  
* **Cross Community Collaboration** – Partnering with blockchain foundations, research institutions, and industrial IoT communities to advance decentralized automation.

---

## **Conclusion**

Morley represents a paradigm shift in smart contract development, making blockchain automation accessible to engineers, industrial programmers, and IoT developers. By providing a Ladder Logic-to-Plutus Core compilation pipeline and a straight forward GUI with ArkWriter, Morley simplifies decentralized automation and extends blockchain utility to new industries.

With ongoing enhancements, expanding industry adoption, and growing community support, Morley is poised to become the go-to solution for blockchain integrated industrial logic.

For more information, visit [**morleylang.org**](https://morleylang.org) and join the conversation on GitHub: [Morley Repository](https://github.com/Liberty-Chris/Morley).

## References

References

<a name="1">1</a> M. M. Chakravarty et al., "Plutus: A Safe and Flexible Smart Contract Platform," IOHK Research, 2018\. \[Online\]. Available: https://iohk.io/en/research/library/papers/plutus-a-safe-and-flexible-smart-contract-platform/

<a name="2">2</a> M. M. Chakravarty et al., "The Extended UTXO Model: A Flexible Alternative to Account-Based Blockchains," IOHK Research, 2020\. \[Online\]. Available: https://iohk.io/en/research/library/papers/the-extended-utxo-model/

<a name="3">3</a> D. Coutts et al., "Transaction Validation and Determinism in Cardano," IOHK Research, 2021\. \[Online\]. Available: https://iohk.io/en/research/library/papers/transaction-validation-and-determinism-in-cardano/

<a name="4">4</a> D. Coutts et al., "Hydra: Fast Isomorphic State Channels," IOHK Research, 2021\. \[Online\]. Available: https://iohk.io/en/research/library/papers/hydra-fast-isomorphic-state-channels/

<a name="5">5</a> IOHK Research, "Midgard: A Computational Framework for Off-Chain Execution," IOHK, 2022\. \[Online\]. Available: https://iohk.io/en/research/library/papers/midgard-a-computational-framework-for-off-chain-execution/

<a name="6">6</a> Midnight, "Nightpaper: A Litepaper Introducing Midnight," Sep. 16, 2024\. \[Online\]. Available: https://midnight.network/whitepaper

<a name="7">7</a> IOHK Research, "Cardano Sidechains: Architecture and Interoperability," IOHK, 2022\. \[Online\]. Available: https://iohk.io/en/research/library/papers/cardano-sidechains-architecture-and-interoperability/

<a name="8">8</a> T. Casini, "OpenPLC: An Open-Source Alternative for Industrial Automation," IEEE Industrial Electronics Magazine, 2017\. \[Online\]. Available: https://ieeexplore.ieee.org/document/7989308

<a name="9">9</a> International Electrotechnical Commission (IEC), "IEC 61131-3: Programmable Controllers – Part 3: Programming Languages," 2013\. \[Online\]. Available: https://webstore.iec.ch/publication/4552

<a name="10">10</a> I. Lee and K. Lee, "The Internet of Things (IoT): Applications, Investments, and Challenges for Enterprises," Business Horizons, 2015\. \[Online\]. Available: https://www.sciencedirect.com/science/article/abs/pii/S0007681314001320

<a name="11">11</a> X. Xu et al., "The Application of Smart Contracts in Supply Chain Management," IEEE Internet of Things Journal, 2020\. \[Online\]. Available: https://ieeexplore.ieee.org/document/9153035



---
*Morley White Paper - Version 1.0 - Christopher Hockaday - February 7, 2025*
