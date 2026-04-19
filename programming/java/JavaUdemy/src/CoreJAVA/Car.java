package CoreJAVA;

// Abstract Class
// Abstract and Non-Abstract Method
// Cant be instantiated
public abstract class Car {
    int mileage;

    Car(int mileage) {
        this.mileage = mileage;
    }

    public abstract void pressBreak();
    public abstract void pressClutch();

    public int getNumberOfWheels(){
        return 4;
    }
}
