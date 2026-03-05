export interface Topic {
  id: string;
  title: string;
}

export interface Unit {
  id: string;
  title: string;
  totalPages: number;
  topics: Topic[];
}

export interface PreviewPage {
  pageNumber: number;
  content: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  units: Unit[];
  preview: PreviewPage[];
}

export const subjects: Subject[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA concepts with comprehensive notes covering arrays, linked lists, trees, graphs, and dynamic programming.',
    price: 99,
    discountedPrice: 49,
    units: [
      {
        id: 'u1',
        title: 'Unit 1: Arrays & Searching',
        totalPages: 45,
        topics: [
          { id: 't1', title: 'Introduction to Data Structures' },
          { id: 't2', title: 'Arrays — Overview & Operations' },
          { id: 't3', title: 'Searching Algorithms' },
          { id: 't4', title: 'Two Pointer Technique' },
          { id: 't5', title: 'Sliding Window' },
          { id: 't6', title: 'Previous Year Questions' },
        ],
      },
      {
        id: 'u2',
        title: 'Unit 2: Linked Lists & Stacks',
        totalPages: 38,
        topics: [
          { id: 't1', title: 'Singly & Doubly Linked List' },
          { id: 't2', title: 'Stack — Implementation & Uses' },
          { id: 't3', title: 'Queue using Stack' },
          { id: 't4', title: 'Circular Linked List' },
          { id: 't5', title: 'Previous Year Questions' },
        ],
      },
    ],
    preview: [
      {
        pageNumber: 1,
        content: `Introduction to Data Structures

Data structures are fundamental building blocks in computer
science. They organize and store data efficiently for various
operations.

Why Data Structures?
  • Efficient data access and modification
  • Better algorithm design
  • Optimal memory usage
  • Faster program execution

Categories:
  Linear   — Arrays, Linked Lists, Stacks, Queues
  Non-linear — Trees, Graphs
  Hash-based — Hash Tables, Hash Maps`,
      },
      {
        pageNumber: 2,
        content: `Arrays — Overview

Arrays are contiguous memory locations storing elements
of the same type.

Declaration:
  int arr[5] = {10, 20, 30, 40, 50};

Time Complexity:
  Access  →  O(1)
  Search  →  O(n)
  Insert  →  O(n)
  Delete  →  O(n)

Key Properties:
  • Fixed size (static arrays)
  • O(1) random access via index
  • Cache-friendly memory layout`,
      },
      {
        pageNumber: 3,
        content: `Searching Algorithms

1. Linear Search — O(n)
   Check each element one by one.
   Works on unsorted arrays.

2. Binary Search — O(log n)
   Requires sorted array.
   Divide and conquer approach.

   Algorithm:
     low = 0, high = n-1
     while low <= high:
       mid = (low + high) / 2
       if arr[mid] == target → return mid
       if arr[mid] < target  → low = mid + 1
       else                  → high = mid - 1

3. Jump Search — O(√n)
   Jump ahead by fixed steps, then linear search.`,
      },
      {
        pageNumber: 4,
        content: `Array Operations

Insertion:
  At end    → O(1) amortized (dynamic array)
  At index  → O(n) — shift elements right

Deletion:
  At end    → O(1)
  At index  → O(n) — shift elements left

Traversal → O(n)

Optimization Techniques:
  • Prefix sum arrays for range queries
  • Kadane's algorithm for max subarray
  • Two-pointer for sorted array problems

★ Exam Tip: Always clarify if array is sorted
  before choosing a search algorithm.`,
      },
    ],
  },

  {
    id: '2',
    title: 'Database Management Systems',
    description: 'Complete DBMS notes covering SQL, normalization, transactions, indexing, and query optimization techniques.',
    price: 99,
    discountedPrice: 49,
    units: [
      {
        id: 'u1',
        title: 'Unit 1: Relational Model',
        totalPages: 42,
        topics: [
          { id: 't1', title: 'Introduction to DBMS' },
          { id: 't2', title: 'Relational Model Concepts' },
          { id: 't3', title: 'Entity-Relationship Model' },
          { id: 't4', title: 'Normalization Basics (1NF–BCNF)' },
          { id: 't5', title: 'Previous Year Questions' },
        ],
      },
      {
        id: 'u2',
        title: 'Unit 2: SQL & Queries',
        totalPages: 50,
        topics: [
          { id: 't1', title: 'DDL, DML, DCL Commands' },
          { id: 't2', title: 'Joins — INNER, LEFT, RIGHT, FULL' },
          { id: 't3', title: 'Subqueries & Views' },
          { id: 't4', title: 'Transactions & ACID Properties' },
          { id: 't5', title: 'Indexing & Query Optimization' },
          { id: 't6', title: 'Previous Year Questions' },
        ],
      },
    ],
    preview: [
      {
        pageNumber: 1,
        content: `Introduction to DBMS

A Database Management System is software that handles
the storage, retrieval, and updating of data in a database.

Advantages over File Systems:
  • Eliminates data redundancy
  • Ensures data consistency
  • Provides concurrent access
  • Enforces security and integrity

Types of Databases:
  Relational    — MySQL, PostgreSQL, Oracle
  NoSQL         — MongoDB, Cassandra
  NewSQL        — CockroachDB, Google Spanner`,
      },
      {
        pageNumber: 2,
        content: `Relational Model

Tables (Relations), Rows (Tuples), Columns (Attributes)

Key Constraints:
  Primary Key  — uniquely identifies each row
  Foreign Key  — references primary key in another table
  Unique       — no duplicate values in column
  Not Null     — column cannot be empty
  Check        — enforces domain constraint

Relational Algebra Operations:
  σ Select   — filter rows
  π Project  — pick columns
  ⨝ Join     — combine tables`,
      },
      {
        pageNumber: 3,
        content: `Entity-Relationship Model

Entities    — real-world objects (e.g. Student, Course)
Attributes  — properties (e.g. Roll No, Name)
Relationships — associations between entities

Cardinality Types:
  1 : 1   One-to-One
  1 : N   One-to-Many
  M : N   Many-to-Many

★ Exam Tip: M:N relationships always become
  a separate table with both primary keys as
  foreign keys in the mapping table.`,
      },
      {
        pageNumber: 4,
        content: `Normalization

Goal: Eliminate redundancy and update anomalies.

1NF — No repeating groups; atomic values only
2NF — 1NF + No partial dependency on composite PK
3NF — 2NF + No transitive dependency
BCNF — Stricter 3NF; every determinant is a candidate key

Functional Dependencies:
  A → B means knowing A determines B

Lossless Decomposition:
  Split must preserve all original data.
  Test: R1 ∩ R2 → R1 or R1 ∩ R2 → R2`,
      },
    ],
  },

  {
    id: '3',
    title: 'Operating Systems',
    description: 'In-depth OS notes covering processes, threads, memory management, file systems, and synchronization.',
    price: 99,
    discountedPrice: 49,
    units: [
      {
        id: 'u1',
        title: 'Unit 1: Process Management',
        totalPages: 48,
        topics: [
          { id: 't1', title: 'OS Fundamentals & Types' },
          { id: 't2', title: 'Process vs Thread' },
          { id: 't3', title: 'CPU Scheduling Algorithms' },
          { id: 't4', title: 'Process Synchronization' },
          { id: 't5', title: 'Deadlocks — Detection & Prevention' },
          { id: 't6', title: 'Previous Year Questions' },
        ],
      },
      {
        id: 'u2',
        title: 'Unit 2: Memory Management',
        totalPages: 44,
        topics: [
          { id: 't1', title: 'Paging & Segmentation' },
          { id: 't2', title: 'Virtual Memory & Demand Paging' },
          { id: 't3', title: 'Page Replacement Algorithms' },
          { id: 't4', title: 'Thrashing & Working Set Model' },
          { id: 't5', title: 'File Systems' },
          { id: 't6', title: 'Previous Year Questions' },
        ],
      },
    ],
    preview: [
      {
        pageNumber: 1,
        content: `Operating System Fundamentals

An OS manages hardware resources and provides services
to application software.

Core Functions:
  • Process Management
  • Memory Management
  • File System Management
  • I/O Device Management
  • Security & Protection

Types of OS:
  Batch       — jobs processed in batches
  Time-Sharing — multiple users simultaneously
  Real-Time   — strict timing guarantees
  Distributed — across multiple machines`,
      },
      {
        pageNumber: 2,
        content: `Process vs Thread

Process: Independent execution unit with its own
         memory space (code, data, heap, stack).

Thread:  Lightweight process — shares code, data,
         and heap with parent process.

Comparison:
  Threads share memory  |  Processes are isolated
  Faster to create      |  Slower, more overhead
  Less secure           |  Better fault isolation

PCB (Process Control Block) stores:
  PID, Program Counter, Registers, Memory limits`,
      },
      {
        pageNumber: 3,
        content: `CPU Scheduling

Scheduling Criteria:
  CPU Utilization  — keep CPU as busy as possible
  Throughput       — processes completed per unit time
  Turnaround Time  — total time from submit to finish
  Waiting Time     — time spent in the ready queue
  Response Time    — time to first response

Algorithms:
  FCFS   — First Come First Served (non-preemptive)
  SJF    — Shortest Job First (optimal avg wait)
  RR     — Round Robin (preemptive, time quantum)
  Priority — higher priority runs first`,
      },
      {
        pageNumber: 4,
        content: `Process Synchronization

Critical Section Problem:
  Only one process should access shared resource
  at a time to avoid race conditions.

Requirements:
  1. Mutual Exclusion  — only one process inside CS
  2. Progress          — no unnecessary blocking
  3. Bounded Waiting   — no starvation

Solutions:
  Semaphore  — integer variable; wait() & signal()
  Mutex      — binary semaphore (lock/unlock)
  Monitor    — high-level synchronization construct

★ Classic Problems: Producer-Consumer,
  Reader-Writer, Dining Philosophers`,
      },
    ],
  },

  {
    id: '4',
    title: 'Computer Networks',
    description: 'Comprehensive networking notes covering OSI model, TCP/IP, routing, protocols, and network security.',
    price: 99,
    discountedPrice: 49,
    units: [
      {
        id: 'u1',
        title: 'Unit 1: Network Layers',
        totalPages: 46,
        topics: [
          { id: 't1', title: 'Introduction to Computer Networks' },
          { id: 't2', title: 'OSI Model — 7 Layers' },
          { id: 't3', title: 'TCP/IP Model' },
          { id: 't4', title: 'IP Addressing & Subnetting' },
          { id: 't5', title: 'Previous Year Questions' },
        ],
      },
      {
        id: 'u2',
        title: 'Unit 2: Protocols & Routing',
        totalPages: 52,
        topics: [
          { id: 't1', title: 'TCP vs UDP' },
          { id: 't2', title: 'Routing Algorithms — RIP, OSPF, BGP' },
          { id: 't3', title: 'Error Detection & Correction' },
          { id: 't4', title: 'Application Layer Protocols' },
          { id: 't5', title: 'Network Security Basics' },
          { id: 't6', title: 'Previous Year Questions' },
        ],
      },
    ],
    preview: [
      {
        pageNumber: 1,
        content: `Introduction to Computer Networks

A network connects multiple devices for data communication.

Types by Geography:
  PAN  — Personal Area Network (Bluetooth, ~10m)
  LAN  — Local Area Network (office/home, ~1km)
  MAN  — Metropolitan Area Network (~city)
  WAN  — Wide Area Network (internet, global)

Network Topologies:
  Bus, Star, Ring, Mesh, Hybrid

Transmission Modes:
  Simplex, Half-Duplex, Full-Duplex`,
      },
      {
        pageNumber: 2,
        content: `OSI Model — 7 Layers

Mnemonic: "Please Do Not Throw Sausage Pizza Away"

  7. Application  — HTTP, FTP, SMTP, DNS
  6. Presentation — Encryption, Compression, Format
  5. Session      — Session setup & teardown
  4. Transport    — TCP, UDP, Port numbers
  3. Network      — IP, Routing, Logical addressing
  2. Data Link    — MAC, Framing, Error detection
  1. Physical     — Bits, Cables, Signals, NIC

Data units:
  Bits → Frames → Packets → Segments → Data`,
      },
      {
        pageNumber: 3,
        content: `TCP/IP Model

4 Layers (combines OSI layers):
  Application    → OSI 5 + 6 + 7
  Transport      → OSI 4
  Internet       → OSI 3
  Network Access → OSI 1 + 2

Key Protocols:
  Application: HTTP(80), HTTPS(443), FTP(21)
               DNS(53), SMTP(25), SSH(22)
  Transport:   TCP (reliable), UDP (fast/unreliable)
  Internet:    IP, ICMP, ARP, RARP
  Net Access:  Ethernet, Wi-Fi, PPP`,
      },
      {
        pageNumber: 4,
        content: `IP Addressing

IPv4: 32-bit address, dotted decimal notation
  Example: 192.168.1.1
  Classes: A (0–127), B (128–191), C (192–223)

IPv6: 128-bit, hexadecimal with colons
  Example: 2001:0db8:85a3::8a2e:0370:7334

Subnetting:
  Divides network into smaller sub-networks
  Subnet Mask: 255.255.255.0 = /24 (CIDR)
  Hosts per subnet = 2^(host bits) - 2

★ Exam Tip: Practice subnetting with /24, /25,
  /26 — very commonly asked!`,
      },
    ],
  },

  {
    id: '5',
    title: 'Software Engineering',
    description: 'Essential SE notes covering SDLC, design patterns, testing strategies, and agile methodologies.',
    price: 99,
    discountedPrice: 49,
    units: [
      {
        id: 'u1',
        title: 'Unit 1: SDLC Models',
        totalPages: 40,
        topics: [
          { id: 't1', title: 'Software Engineering Introduction' },
          { id: 't2', title: 'Waterfall & V-Model' },
          { id: 't3', title: 'Agile & Scrum Framework' },
          { id: 't4', title: 'Spiral Model' },
          { id: 't5', title: 'Requirements Engineering' },
          { id: 't6', title: 'Previous Year Questions' },
        ],
      },
      {
        id: 'u2',
        title: 'Unit 2: Design Patterns',
        totalPages: 36,
        topics: [
          { id: 't1', title: 'SOLID Design Principles' },
          { id: 't2', title: 'Creational Patterns (Singleton, Factory)' },
          { id: 't3', title: 'Structural Patterns (Adapter, Facade)' },
          { id: 't4', title: 'Behavioural Patterns (Observer, Strategy)' },
          { id: 't5', title: 'Software Testing Strategies' },
          { id: 't6', title: 'COCOMO & Metrics' },
        ],
      },
    ],
    preview: [
      {
        pageNumber: 1,
        content: `Software Engineering Introduction

Systematic, disciplined, and quantifiable approach to
the development, operation, and maintenance of software.

Goals:
  • Deliver on time and within budget
  • Meet user requirements
  • Maintainable and reliable software

Key Challenges:
  Complexity, Changing requirements,
  Team communication, Technical debt`,
      },
      {
        pageNumber: 2,
        content: `SDLC Models

Waterfall:
  Sequential phases — no going back.
  Best for stable, well-defined requirements.

Agile:
  Iterative sprints (2–4 weeks).
  Adapts to changing requirements.
  Values: Working software > documentation.

Spiral:
  Combines Waterfall + Risk Analysis.
  Each loop: Plan → Risk → Build → Evaluate.
  Best for large, high-risk projects.

V-Model:
  Every development phase has a testing phase.`,
      },
      {
        pageNumber: 3,
        content: `Requirements Engineering

Types:
  Functional     — what the system should DO
  Non-functional — how the system should PERFORM
                   (performance, security, usability)

Gathering Techniques:
  Interviews, Surveys, Workshops,
  Observation, Prototyping

SRS Document (Software Requirements Specification):
  • Scope & purpose
  • Functional requirements
  • Non-functional requirements
  • Use case diagrams`,
      },
      {
        pageNumber: 4,
        content: `Software Design Principles

SOLID:
  S — Single Responsibility Principle
  O — Open/Closed Principle
  L — Liskov Substitution Principle
  I — Interface Segregation Principle
  D — Dependency Inversion Principle

Cohesion & Coupling:
  High Cohesion  — module does one thing well ✓
  Low Coupling   — modules minimally dependent ✓

Modularity:
  Break system into independent, interchangeable
  modules. Easier to test, maintain, and reuse.

★ Exam Tip: SOLID is heavily tested — know
  each principle with a real-world example.`,
      },
    ],
  },
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};