#include <bits/stdc++.h>
using namespace std;

// Type Aliases
#define int long long
#define vi vector<int>
#define si set<int>
#define mi map<int, int>
#define pi pair<int, int>

// Utility Aliases
#define pq_min priority_queue<int, vector<int>, greater<int>> 
#define pq_max priority_queue<int>

// Output Shorthand
#define yes cout << "Yes" << endl
#define no cout << "No" << endl

void haribhakt_fastio() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
}

void helper(){   
}

void solve() {
    string s; cin>>s;
    int oneCnt = 0, zeroCnt = 0;
    for(auto ch: s){
        if(ch == '0') zeroCnt++;
        else oneCnt++;
    }
    for(auto ch: s){
        if(ch == '0'){
            if(oneCnt > 0) oneCnt--;
            else break;
        }
        else{
            if(zeroCnt > 0) zeroCnt--;
            else break;
        }
    }
    cout<<oneCnt+zeroCnt<<endl;
}

signed main() {   
    haribhakt_fastio(); 
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}