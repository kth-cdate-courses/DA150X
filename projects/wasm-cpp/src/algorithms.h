#ifndef _ALGORITHMS_H
#define _ALGORITHMS_H

#include "./bfs.h"
#include "./lud.h"
#include "./pagerank.h"
#include "./crc.h"
#include "./lavamd.h"
#include "./facetrain.h"
#include "./needle.h"

extern "C"
{
	int cppTrivial(int a);
	int cppAdd(int a, int b);
	int cppBfs(int nodes);
	int cppLud(int matrix_dim);
	int cppPageRank(int n);
	int cppCrc(int pageSize);
	int cppLavaMD(int boxes);
	int cppBackprop(int layer_size);
	int cppNeedle(int dimension);
}
#endif
