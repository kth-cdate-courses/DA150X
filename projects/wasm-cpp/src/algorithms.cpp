#include <emscripten.h>
#include <chrono>
#include <iostream>

#include "algorithms.h"

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
		char argv[10];
		sprintf(argv, "%d", nodes);
		return BFSGraph(1, (char **)&argv);
	}

	int cppLud(int matrix_dim)
	{
		char temp[10];
		sprintf(temp, "%d", matrix_dim);
		// Combine argv with -a flag
		char *argv[] = {" ", "-s", temp};

		// Calculate argc from argv
		int argc = sizeof(argv) / sizeof(argv[0]);

		return lud(argc, (char **)argv);
	}
}