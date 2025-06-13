package OOPS;

public class Platypus implements Mammal{
    private String name;
    public Platypus(String name){
        this.name = name;
    }
    @Override
    public void walk(){
        System.out.println(this.name + " Walks!");
    }

    @Override
    public void breathe() {
        System.out.println(this.name + " Breathes");
    }

    public String getName(){
        return this.name;
    }
}
