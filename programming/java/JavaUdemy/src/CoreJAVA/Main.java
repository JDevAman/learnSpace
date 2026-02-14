package CoreJAVA;

public class Main {
    public static void main(String[] args) {
        System.out.println("Build");
        System.out.println(new Annotations().getClass().getAnnotation(MyCustomAnnotations.class));
    }
}
