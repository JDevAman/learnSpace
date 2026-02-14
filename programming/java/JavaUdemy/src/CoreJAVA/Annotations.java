package CoreJAVA;
import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.CLASS)
@interface MyCustomAnnotations{
    String name() default "Test";
}

@interface MyCustomAnnotation{
}

@MyCustomAnnotations()
// Array for multiple values
@SuppressWarnings({"unused", "deprecated"})
@Deprecated
public class Annotations {
    public void unusedMethod(){
    }
}
