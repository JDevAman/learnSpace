class Solution {
    public boolean uniformArray(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int minOdd = -1;
        if(nums[0] % 2 == 1) minOdd = nums[0];
        int parity = nums[0] %  2;
        for(int i=0; i<n; i++){
            int currParity = nums[i] % 2;
            if(currParity != parity){
                if(minOdd == -1) return false;
            }
            if(currParity == 1 && minOdd == -1) minOdd = nums[i]; 
        }

        return true;
    }
}