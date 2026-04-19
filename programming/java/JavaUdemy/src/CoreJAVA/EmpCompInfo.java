package CoreJAVA;

public class EmpCompInfo extends EmpInfo<Integer>{
    String payComponent;

    public EmpCompInfo(String payComp){
        this.payComponent = payComp;
    }

    public String getPayComponent(){
        return this.payComponent;
    }
}
