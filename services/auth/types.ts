export interface AuthApi {
  getToken: () => Promise<string>
}
