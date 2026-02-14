package CoreJAVA;

public class Basics {
    int memberVar;
    static int classVar;
    private static String name;
    private static String getName(){
        return name;
    }
    public int newClass(int parameter){
        int localVar = parameter;
        return localVar;
    }

    public static void main(String[] args) {
        Basics.name = "Aman";
        System.out.println(Basics.getName());
    }
    static class OOPS {
        public static void main(String[] args) {
            System.out.println("Hi");
            Student s1 = new Student();

        }
    }
}
