package CoreJAVA;

public class LuxuryCar extends Car {
    LuxuryCar(int mileage){
        super(mileage);
    }

    @Override
    public void pressBreak(){
        System.out.println("Brakes Applied");
    }

    @Override
    public void pressClutch(){
        System.out.println("Clutch Applied");
    }
}
