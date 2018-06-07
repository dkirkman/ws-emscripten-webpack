#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int add_values(int v1, int v2) {
  return v1 + v2;
}
