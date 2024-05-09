export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.includes("/auth/user")) {
    const user = useSupabaseUser();
    if (user.value) {
      return;
    }
    return navigateTo("/auth/login");
  }
});
