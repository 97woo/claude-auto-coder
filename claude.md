내용 공유 드립니다. 

Development Guidelines

| # | Item | Brief Description |
|---|------|-------------------|
| 1 | Consistent Code Style | Apply a single formatter/style guide (indentation, braces, naming) across the project. |
| 2 | Meaningful Naming | Use descriptive names for variables, functions, and classes that clearly express intent. |
| 3 | Short, Single-Purpose Functions | Keep each function focused on one task; avoid excessive length. |
| 4 | DRY Principle | Eliminate duplicate logic; maintain a single source of truth. |
| 5 | KISS Principle | Prefer simple solutions; minimize unnecessary complexity. |
| 6 | YAGNI Principle | Don’t add functionality or abstraction until it is actually needed. |
| 7 | SRP (Single Responsibility Principle) | Each module/class should have exactly one reason to change. |
| 8 | OCP (Open-Closed Principle) | Modules should be open for extension but closed for modification. |
| 9 | LSP (Liskov Substitution Principle) | Subtypes must be substitutable for their base types without breaking correctness. |
|10 | ISP (Interface Segregation Principle) | Prefer many small, focused interfaces over one large “fat” interface. |
|11 | DIP (Dependency Inversion Principle) | High-level and low-level modules depend on abstractions, not on concrete details. |
|12 | High Cohesion & Low Coupling | Strongly related elements stay together; inter-module dependencies are minimized. |
|13 | Composition over Inheritance | Favor composition/delegation instead of deep inheritance hierarchies. |
|14 | Law of Demeter | “Talk only to your immediate friends”; avoid deep method-chaining into internals. |
|15 | Convention over Configuration | Adopt standard project layouts, naming, and sane defaults to reduce explicit config. |
|16 | Unit Testing & TDD | Write automated tests first; ensure high coverage and prevent regressions. |
|17 | Regular Refactoring | Continuously improve internal structure without changing external behavior. |
|18 | Code Reviews & Pair Programming | Peer review for quality control and knowledge sharing. |
|19 | Effective Version Control | Frequent small commits, meaningful messages, consistent branching strategy. |
|20 | Self-Documenting Code & Minimal Comments | Code should convey intent; comments focus on “why,” not “what.” |
|21 | Robust Error Handling | Validate inputs, catch exceptions, log meaningful context; avoid silent failures. |
|22 | Security Best Practices | Input validation, secret management, encryption, least privilege, patching, etc. |
|23 | Avoid Premature Optimization | Optimize only with profiling evidence; prioritize clarity first. |
|24 | Use Established Libraries/Frameworks | Prefer well-tested, community-validated libraries over custom re-implementation. |
|25 | Boy Scout Rule | Leave the codebase a little cleaner whenever you touch it. |
|26 | Continuous Integration (CI) | Automate build and test on every commit/pull request. |
|27 | Static Analysis & Linting | Enforce style and detect potential issues automatically. |
|28 | Domain-Driven Design (DDD) | Model complex business domains with a common language and bounded contexts. |
|29 | Hexagonal / Ports-and-Adapters Architecture | Isolate domain logic from external systems via ports and adapters. |
|30 | Feature Toggles (Flags) | Separate deployment from release; enable gradual rollouts and A/B tests. |
|31 | Semantic Versioning | Use MAJOR.MINOR.PATCH to communicate compatibility and change scope. |
|32 | Continuous Delivery (CD) | Automated deployment pipeline after CI; Blue-Green/Canary strategies. |
|33 | Infrastructure as Code (IaC) | Manage infrastructure declaratively (e.g., Terraform) under version control. |
|34 | Supply-Chain Security (SBOM/SLSA) | Generate signed SBOMs; verify dependency integrity and provenance. |
|35 | End-to-End & Contract Testing | Validate full user flow (UI→API→DB) and detect breaking API contract changes. |