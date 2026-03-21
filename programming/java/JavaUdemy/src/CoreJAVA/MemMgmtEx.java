package CoreJAVA;

import java.lang.ref.WeakReference;

public class MemMgmtEx {

    public static void main(String[] args) {
        // Stack
        String obj1 = "Object1";

        // Heap
        WeakReference<String> obj2 = new WeakReference<>("WeakRefObj");
        // Soft Reference

        // Garbage Collection
        String obj3 = "Object3";
        String obj4 = "Object4";
        String obj5 = "Object5";

        // All 5 above goes to Eden
        obj2 = obj1;
        obj5 = obj4;

        // obj2 and obj5 are deleted from Heap Memory
        return;
    }
}
