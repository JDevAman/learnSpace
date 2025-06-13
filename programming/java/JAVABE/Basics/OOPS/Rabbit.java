package OOPS;

class Rabbit extends Animal {
    public Rabbit(String name){
        super(name);
    }
    @Override
    public void makeSound() {
        System.out.println(getName() + " says: Squeak! ");
    }

    public void run(){
        System.out.println(getName() + " is running! ");
    }
}
