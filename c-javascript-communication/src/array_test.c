#ifdef EMSCRIPTEN
  #include <emscripten.h>
  #define EXPORT EMSCRIPTEN_KEEPALIVE
#else
  #define EXPORT
#endif

EXPORT
void inc_array(double *array, size_t ndat) {
  for (size_t i=0; i<ndat; ++i) {
    array[i] += 1;
  }
}
