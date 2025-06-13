package OOPS;
import java.util.*;

public abstract class Animal {
    private String name;
    public Animal(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }
    public void eat(){
        System.out.println(name+" is eating.");
    }
    abstract void makeSound();
}


