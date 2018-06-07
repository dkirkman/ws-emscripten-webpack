#ifdef EMSCRIPTEN
  #include <emscripten.h>
  #define EXPORT EMSCRIPTEN_KEEPALIVE
#else
  #define EXPORT
#endif

EXPORT
int add_values(int v1, int v2) {
  return v1 + v2;
}
