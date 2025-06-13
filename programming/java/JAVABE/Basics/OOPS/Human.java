package OOPS;

public class Human implements Mammal{
    private String name;
    public Human(String name){
        this.name = name;
    }

    @Override
    public void walk(){
        System.out.println(this.name + " Walks!");
    }

    @Override
    public  void breathe(){
        System.out.println(this.name + " Breathes!");
    }
}
