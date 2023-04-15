#ifndef _ALGORITHMS_H
#define _ALGORITHMS_H

#include "./bfs.h"
#include "./lud.h"

extern "C"
{
	int cppAdd(int a, int b);
	int cppBfs(int nodes);
	int cppLud(int matrix_dim);
}
#endif
