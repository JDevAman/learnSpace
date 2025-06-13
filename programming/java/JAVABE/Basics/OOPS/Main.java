package OOPS;
import java.util.*;
public class Main {
    public static void main(String[] args) {
        // Abstract Class - Abstract + Concrete methods, Single Class extends, constructor
        Animal monu = new Rabbit("monu");
        Rabbit cheeku = new Rabbit("cheeku");
        monu.makeSound();
        cheeku.makeSound();
        // monu.run();
        cheeku.run();

        // Interface: Only Abstract Methods, Multiple classes can Implement, No constructor
        Human aman = new Human("Aman");
        Platypus perry = new Platypus("Perry");
        aman.walk();
        perry.breathe();
    }
}
