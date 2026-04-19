package CoreJAVA;

public class ClassEx {
    public static void main(String[] args) {
        // Concrete Class
        Student s1 = new Student();
        // Object lambo: means we are saying to only use it as object and access Object Methods only
        // List = new ArrayList ? Liskov Substitution Principle
        LuxuryCar lambo = new LuxuryCar(1);
        lambo.pressBreak();
        System.out.println(lambo.getNumberOfWheels());

        // Nested Class
        ITR.NewRegime itr = new ITR.NewRegime();
        itr.print();

        // Local Inner Class
        ITR itrObj = new ITR();
        itrObj.display();

        // Generic Class
        EmpCompInfo ec1 = new EmpCompInfo("Basic Pay");
        ec1.setValue(1000);
        System.out.println("PayComponent: "+ec1.getPayComponent()+", Value: "+ec1.getValue());
    }
}
