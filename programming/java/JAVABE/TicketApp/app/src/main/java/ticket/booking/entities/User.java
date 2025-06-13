package ticket.booking.entities;

import java.util.*;

public class User {
    private String name;
    private String userId;
    private String hashedPassword;
    private List<Ticket> tickets;
}