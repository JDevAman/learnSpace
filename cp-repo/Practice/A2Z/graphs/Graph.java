import java.util.*;

// All Graph Algos
public class Graph{
	private Map<Integer, List<Integer>> adjList;

	Graph(){
		adjList = new HashMap<>();
	}

	public void addVertex(int src){
		adjList.put(sec, new ArrayList<>());
	}

	public void addEdge(int src, int dest){
		adjList.get(src).add(dest);
	}

	public void removeVertrx(int src){
		adjList.remove(src);

		for(List<Integer> nghbr: adjList.values()){
			nghr.remove(Integer.valueOf(src));
		}
	}

	public void removeEdge(int src, int dest){
		adjList.get(src).remove(Integer.valueOf(dest));
		// Undirected
		// adjList.get(dest).remove(Integer.valueOf(src));
	}

	public List<Integer> getNeighbors(int src){
		return adjList.get(src);
	}
}

// BFS
// DFS
// Single Source Shortest Path
// BFS, Dijkstra, BellMan ford


