package CoreJAVA;

public class EmpInfo<T> {
    private T value;
    public T getValue(){
        return value;
    }

    public void setValue(T val){
        this.value = val;
    }
}
