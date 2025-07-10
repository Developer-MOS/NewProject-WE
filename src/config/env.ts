interface EnvConfig {
    apiUrl: string;
    apiKey: string;
}



let runtimeEnv: EnvConfig = {
    apiUrl: 'https://live-mt-server.wati.io/11022',
    apiKey: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNjljNGM2Yi0zMTA2LTRjN2MtYmViZC1iNzU4MmYyYTM1NWYiLCJ1bmlxdWVfbmFtZSI6ImluZm9AZXl2YS5pbyIsIm5hbWVpZCI6ImluZm9AZXl2YS5pbyIsImVtYWlsIjoiaW5mb0BleXZhLmlvIiwiYXV0aF90aW1lIjoiMDYvMDMvMjAyNSAwNjozNzozMiIsInRlbmFudF9pZCI6IjExMDIyIiwiZGJfbmFtZSI6Im10LXByb2QtVGVuYW50cyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.M2O60dp2ta9uBPPjhauCbb0BQpXDCDoScKqcOGx_B3Q',
};

export const setEnv = (config: EnvConfig) => {
    runtimeEnv = { ...config };
};

export const getEnv = (): EnvConfig => {
    return runtimeEnv;
}; 