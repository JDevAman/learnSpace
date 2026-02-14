package CoreJAVA;

public class ExceptionHandling {
    public static void main(String[] args) {
        try {
            method1("custom");
        } catch (ClassNotFoundException | InterruptedException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            System.out.println("Exception Handled Successfully");
        }
    }

    public static void method1(String name) throws Exception {
        if (name.equals("dummy")) {
            throw new ClassNotFoundException("ClassNotFound Exception");
        } else if (name.equals("interrupted")) {
            throw new InterruptedException("Interrupted Exception");
        } else {
            throw new MyCustomException("Custom Exception");
        }
    }

}

//Custom Exception Class
class MyCustomException extends Exception {
    MyCustomException(String message) {
        super(message);
    }
}
