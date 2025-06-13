# Operating System

## OS and Main Functioms

### Real Life Analogy

- Imagine an example of restaurant having waiter, customer and restaurant manager.
  - Customer (User) orders food | Requests a task
  - Waiter (OS) takes an order | Acts as an intermediary
  - Waiter delivers the order to kitchen (CPU) | Sends request for processing
  - Chef (CPU) prepares the food to customer | Returns the processed output
  - Waiter manages multiple customers efficiently | Handles multitasking and resource allocation

- The waiter acts as a middleman between the customer (User) and kitchen (CPU), ensuring smooth communication and efficient service
- An Operating System is like the waiter of restaurant that ensures everything runs smoothly, between customers, chef and manager.

### Overview

- Fundamental software that manages hardware and software resources on a computer. It acts as an intermediary between users and the computer hardware, ensuring that apps run smoothly and resources are allocated efficiently.
- Also provides an environment where applications can run and users can interact with the computer.

#### WHY OS?

1. Two Tier Architecture: System and Application Program with Hardware

    - Users must control hardware manually (programming)
    - Only dedicated programs can run, no multitasking
    - User needs to interact with hardware for any small task.
    - Leads to improper resource and memory utilisation as you have to tell hardware explicitly to allocate memory.
  
2. Three Tier Architecture: System & Application Programs, Operating System, Hardware
    - Provides a GUI to interact with applications and files easily
    - Allows running mutiple applications
    - Manages CPU, memory, and storage to optimize performance

### SOFTWARE

1. System Software
    - Helps to manage and operate the computer hardware so that other software can function.
    - Ex: Compiler, Operating System, Utiity Software
2. Application Software
    - Designed to perform specific tasks for users. It runs on top of system software and interacts with it to carry out its functions.

### Interactions

1. User Interaction
    - The user interacts with the application (text editor) and requests to save the document.
2. Application - OS Interaction
    - Application sends a **system call** to OS to request writing document to storage device
3. Os - Hardware Interaction
    - OS communicates with hardware through the file system and storage device drivers to physically write the data to storage medium.
4. Hardware
    - The hardware performs the actual writing of data to disk.
