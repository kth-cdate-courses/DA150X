#include <emscripten.h>

// Type mangling
extern "C"
{

	int cppAdd(int a, int b)
	{
		int *pointer = new int;

		delete pointer;

		return a * b;
	}
}