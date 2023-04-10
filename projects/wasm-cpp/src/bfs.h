#ifndef COMMON_RAND_H

#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>
#include <limits.h>
#include <vector>

#include "./common.h"

using namespace std;

struct Node
{
	int starting;
	int no_of_edges;
};

struct edge; // forward declaration
typedef vector<edge> node;
struct edge
{
	unsigned long dest;
	unsigned weight;
};

void BFSGraph(int argc, char **argv);
void InitializeGraph(Node **, bool **, bool **, bool **, int **, int **, int);

#endif // COMMON_RAND_H

#define COMMON_RAND_H