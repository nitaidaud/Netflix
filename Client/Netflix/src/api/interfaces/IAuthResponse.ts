export default interface IAuthResponse { 
    isAuthenticated: boolean
    emailVerified: boolean | null;
}