# 14 Task Queues and Background Jobs

Task queues allow a backend to handle expensive, slow, or unreliable operations without making the user wait for a response.

## I. The "Why": From Synchronous to Asynchronous

In a Synchronous (Blocking) flow, the User Signup request must wait for the Email API (Resend/Brevo) to respond.

- Risk: If the Email API takes 5 seconds or fails, the user’s signup hangs or crashes, even though the database record was created successfully.
- Solution: Offloading. The backend performs the "must-do" work (DB write) and offloads the "eventually-do" work (Email) to a background process.

## II. The Architecture (Producer-Broker-Consumer)

1. Producer (The API Server)
   - Serialization: Converts the task data into a format like JSON or Protobuf.
   - Push: Sends the "job" to the Broker.
   - Immediate Response: Returns a 202 Accepted or 200 OK to the user immediately.

2. Message Broker (The Queue)
   - Technologies: Redis (used by BullMQ/Sidekiq), RabbitMQ, AWS SQS.
   - Durability: Ensures that even if the broker restarts, the tasks aren't lost (persisted to disk).

3. Consumer/Worker (The Execution Engine)
   - Runs as a separate process or on a separate server entirely.
   - Polling/Pub-Sub: Constantly watches the queue for new tasks.
   - Acknowledgment (ACK): The worker tells the queue "I am finished" so the queue can safely delete the task.

## III. Core Technical Concepts

1. Visibility Timeout & Acknowledgement
   - When a Consumer picks up a task, the Broker "hides" it from other consumers for a set period (e.g., 30 seconds).
   - If the Consumer fails to send an ACK (e.g., the server crashed), the Visibility Timeout expires, and the task becomes visible again for another worker to try. This ensures At-least-once delivery.

2. Retries and Exponential Backoff
   - If a 3rd party service is down, don't retry immediately (which might worsen the outage).
   - Exponential Backoff: Wait 1s, then 2s, then 4s, then 8s...
   - Dead Letter Queue (DLQ): If a task fails $X$ times, move it to a special "Dead Letter" queue for manual inspection by an engineer.

3. Idempotency (Critical)
   - Principle: If a task runs twice, the result should be the same as if it ran once.
   - Example: If a "Send Invoice" task retries, check if the "invoice_sent" flag is already TRUE in the DB before sending another email.

## IV. Task Types & Use Cases

| Task Type           | Examples                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| One-off             | Verification emails, password resets.                                                              |
| Recurring (Cron)    | Daily database backups, monthly billing reports, clearing expired sessions.                        |
| Chained (Workflows) | Video Upload $\rightarrow$ Transcoding $\rightarrow$ Thumbnail Gen $\rightarrow$ Notify Followers. |
| Batch               | Processing a CSV upload with 10,000 rows.                                                          |

## V. Design Considerations for Backend Engineers

- Ordering: Standard queues are FIFO (First-In, First Out), but in distributed systems, exact ordering can be hard. Use Message Groups if sequence matters.

- Scaling: If the "Queue Length" is growing, use Autoscaling up to spin up more Worker containers.

- Monitoring (The "Pulse"):
  - Queue Depth: How many jobs are waiting?
  - Failure Rate: What percentage of jobs are hitting the DLQ?
  - Processing Time: How long does a job take once picked up?

- State Management: Workers should be stateless. They should get all the data they need from the task payload or primary database.

## VI. Best Practices

1. Keep Payloads Small: Don't put a whole 5MB image in the queue; put the S3 URL of the image in the queue and let the worker fetch it.
2. Atomic Commits: Ensure the task is only added to the queue after the database transaction is committed.
3. Graceful Shutdown: Ensure workers finish their current job before the process is killed during a deployment.

Example:

User signs up on frontend and backend sends verification mail to email id.

How to handle this?

Activity offloaded to Background Job:
For sending mail to user, we use resend/brevo.
Form HTML template and make api call to Third party services and sends response back to backend.

Issues:
Third Party Email fails which causes signup to fail.

Solution:
Rather than sync flow, Service serializes data in JSON format and packages it to Queue.
Consumer(Worker): They take out tasks from queue
Diff consumer pick diff type of tasks from diff queue (mail, push notifications).

Then we add handler to deserialize and process request.
If 3rd party is down, consumer process fails. We can use retries (exponential backoff) using BullMQ and max amount of retries.

Use Cases:

1. Sending Emails
2. Processing Images/Videos
3. Generating Reports
4. Sending Push notifications (When we install, device is registered under push notifications service, backend sends call to operating system of device and it makes to you.)

## Task Queue

Managing and distributing background jobs.

Core Idea:

Producer: Creates Task and pushes to queue.
Queue (Broker)
Consumer: Runs in different process; picks out and processes.Sends ack back to queue.
Ex: RabbitMQ, Redis: Pub-Sub, SQS
Visbility Timeout - Queue makes task available to other consumer/worker.

Types of Tasks:

One-off tasks: Email - Welcome, Verification
Recurring tasks: Send monthly, quarterly reports.
Chained Tasks: LMS - Udemy: Upload video, Create Thumbnail, generate transcription
Batch Tasks: Delete account

Design Considerations:

Idempotency - Design task such that retries must be from scatch
Error handling - Diff Process, must be goood
Monitoring - Tasks in queue, failed, job (Metrics -> Grafana Dashboard)
Scaling -
Ordering -
Rate Limiting -

Best Practices:
Keep Tasks small and focused (Single Responsible)
Avoid Long running tasks
Use Proper Error handling and logging
Monitor queue length and worker health
