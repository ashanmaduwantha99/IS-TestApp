export const environment = {
  production: false,
  staging: false,
  //base_url: 'https://localhost:44373/',
  base_url: 'https://v2.api.dev.backofficemicrobuild.no/',
  authSettings: {
    authority: 'https://identityserver.devmicrobuild.no/',
    client_id: 'mb-backoffice-v2',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    scope: 'openid backoffice offline_access',
  }
};