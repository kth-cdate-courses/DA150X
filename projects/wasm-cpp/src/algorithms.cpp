#include <emscripten.h>
#include "algorithms.h"
#include <chrono>

// Name mangling
extern "C"
{

	int cppAdd(int a, int b)
	{
		int *pointer = new int;

		delete pointer;

		return a * b;
	}

	int cppBfs(int nodes)
	{
		// Start time for chrono
		auto start = std::chrono::high_resolution_clock::now();
		char *argv = {"40000"};
		BFSGraph(1, &argv);
		// Get duration in milliseconds
		auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::high_resolution_clock::now() - start);
		return duration.count();
	}
}