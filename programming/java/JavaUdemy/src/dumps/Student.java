package dumps;

public class Student {
    private static String name;
    private static String getName(){
        return name;
    }

    public static void main(String[] args) {
        Student.name = "Aman";
        System.out.println(Student.getName());
    }
}
