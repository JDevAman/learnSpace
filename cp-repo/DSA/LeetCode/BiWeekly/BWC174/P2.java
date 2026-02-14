class Solution {
    public int minOperations(int[] nums, int[] target) {
        int n = nums.length;
        TreeMap<Integer, Integer> mpp = new TreeMap<>();
        for(int i=0; i<n; i++){
            if(nums[i] != target[i]){
                mpp.put(nums[i], mpp.getOrDefault(nums[i], 0)+1);
            }
        }

        return mpp.size();
    }
}