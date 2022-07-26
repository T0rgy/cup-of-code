// used to decode a token and get user info out of it
import decode from 'jwt-decode';

const localStorageKey = 'idToken';

// class to instantiate for a user
export default class AuthService {
    // get token
    getToken() {
        return localStorage.getItem(localStorageKey);
    }

    // get user data
    getLoggedInUser() {
        // get token and decode it. Return either decoded data or false
        return this.getToken() && decode(this.getToken())?.data || false
    }

    // check if user is logged in
    loggedIn() {
        // get the token
        const token = this.getToken();

        // check that token exists AND is not expired
        if (token && !this.isTokenExpired(token)) {
            // decode token and return user data
            const decodedToken = decode(token)
            return decodedToken;
        }
        // else return false
        return false
    }

    // check if token is expired
    isTokenExpired(token) {
        // decode token
        const decoded = decode(token);
        // compare expiration to current timestamp
        if (decoded.exp < Date.now() / 1000) {
            // if expired remove from localStorage
            localStorage.removeItem(localStorageKey);
            return true;
        }
        return false
    }

    // login as function of token that redirects to dashboard and sets item in localStorage
    login(token) {
        localStorage.setItem(token);
        window.location.redirect('/');
    }

    // logout removes token from localStorage and redirects to login window
    logout() {
        localStorage.removeItem(localStorageKey);
        window.location.redirect('/login');
    }
}