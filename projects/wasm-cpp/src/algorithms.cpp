#include <emscripten.h>
#include <chrono>
#include <iostream>

#include "algorithms.h"

// Name mangling
extern "C"
{

	int cppTrivial(int a)
	{
		return a;
	}

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

	int cppPageRank(int n /* , int iter, int thresh, int divisor */)
	{
		char nChar[10];
		sprintf(nChar, "%d", n);

		/* char iterChar[10];
		sprintf(iterChar, "%d", iter);

		char threshChar[10];
		sprintf(threshChar, "%d", thresh);

		char divisorChar[10];
		sprintf(divisorChar, "%d", divisor); */

		// Combine argv with -a flag
		/* char *argv[] = {" ", "-n", nChar, "-i", iterChar, "-t", threshChar, "-q", divisorChar}; */
		char *argv[] = {" ", "-n", nChar};

		// Calculate argc from argv
		int argc = sizeof(argv) / sizeof(argv[0]);

		return pageRank(argc, (char **)argv);
	}
	int cppCrc(int pageSize)
	{
		return runCrc(pageSize, 1000);
	}
}