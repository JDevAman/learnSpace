# Project Overview:

## LLD

### Entities:

#### User

- String name
- String hashedPassword
- List\<Ticket> tickets
- String userId

#### Ticket

- String ticketId
- String userId
- String source
- String destination
- DateTime dateOfTraveral
- Train train

#### Train

- String trainId
- String trainNo
- DateTime departTime
- DateTime arrivalTime
- List<List<Boolean>> seats



