package CoreJAVA;
import OOPS.StudentRecord;

//  Abstraction: Interface hides logic
//  Inheritance: Implements interface
//  Polymorphism: getAddress() overridden
//  Encapsulation: Private fields + public getters/setters

public class Student implements StudentRecord {
    private int rollNumber;
    private int age;
    private String address;

    // Parameterized Constructor
    public Student(int rollNumber, int age, String address) {
        this.rollNumber = rollNumber;
        this.age = age;
        this.address = address;
    }

    // Default Constructor
    public Student() {
        System.out.println("Default Constructor Called");
    }

    //  Getter method (Polymorphism via Interface)
    @Override
    public String getAddress() {
        return this.address;
    }

    // Optional Setter
    public void updateAddress(String newAddress) {
        this.address = newAddress;
    }
}
