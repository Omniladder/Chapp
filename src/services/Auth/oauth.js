"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = googleAuth;
exports.googleToken = googleToken;
exports.githubAuth = githubAuth;
exports.githubToken = githubToken;
const googleapis_1 = require("googleapis");
const googleTokenSchema_1 = __importDefault(require("./googleTokenSchema"));
const userSchema_1 = require("../../models/userSchema");
const GOOGLE_REDIRECT_URI = process.env.BACKEND_SITE_URL + "/api/googleToken";
const HOME_ADDRESS = process.env.FRONTEND_SITE_URL + "/";
// Clients
const googleClient = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_OAUTH_ID, process.env.GOOGLE_OAUTH_SECRET, GOOGLE_REDIRECT_URI);
//const githubClient = 
// Google Authentication
function googleAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const googleURL = googleClient.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email'],
            redirect_uri: GOOGLE_REDIRECT_URI
        });
        res.redirect(googleURL);
    });
}
function googleToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get Information on Google Account
        const authData = googleTokenSchema_1.default.safeParse(req.query);
        if (!authData.success) {
            console.log("Failed to Parse Auth Data");
            return res.status(400).json({ error: "Missing or invalid query params" });
        }
        const { code } = authData.data;
        const { tokens } = yield googleClient.getToken(code);
        googleClient.setCredentials(tokens);
        const oauth2 = googleapis_1.google.oauth2({ auth: googleClient, version: 'v2' });
        const { data } = yield oauth2.userinfo.get();
        //Get User
        let dbUser = yield userSchema_1.User.findOne({ where: { googleID: data.id } });
        if (!dbUser) {
            const { id, email, given_name, family_name } = data;
            const user = { googleID: id, email: email, fname: given_name, lname: family_name, username: email.split("@")[0] };
            dbUser = yield userSchema_1.User.create(user);
        }
        req.session.userID = dbUser.id;
        res.redirect(HOME_ADDRESS);
    });
}
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_SECRET_ID;
// Github Authentication
function githubAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const REDIRECT_URI = process.env.BACKEND_SITE_URL + "/api/githubToken";
        const GH_BASE_URL = "https://github.com/login/oauth/authorize";
        const REDIRECT_QUERY = "&redirect_uri=" + encodeURIComponent(REDIRECT_URI);
        const CLIENT_QUERY = "?client_id=" + GITHUB_CLIENT_ID;
        const SCOPE_QUERY = "&scope=user:email";
        const githubURL = GH_BASE_URL + CLIENT_QUERY + REDIRECT_QUERY + SCOPE_QUERY;
        res.redirect(githubURL);
    });
}
function githubToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const REDIRECT_URI = process.env.BACKEND_SITE_URL + "/api/githubToken";
        const authData = googleTokenSchema_1.default.safeParse(req.query);
        if (!authData.success) {
            console.log("Failed to Parse Auth Data");
            return res.status(400).json({ error: "Missing or invalid query params" });
        }
        const { code } = authData.data;
        const tokenResponse = yield fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: REDIRECT_URI,
            }),
        });
        const tokenData = yield tokenResponse.json();
        const accessToken = tokenData.access_token;
        const user = yield getGithubUser(accessToken);
        let dbUser = yield userSchema_1.User.findOne({ where: { githubID: user.githubID } });
        if (!dbUser) {
            dbUser = yield userSchema_1.User.create(user);
        }
        req.session.userID = dbUser.id;
        res.redirect(HOME_ADDRESS);
    });
}
function getGithubUser(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const newUserResponse = yield fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });
        const user = yield newUserResponse.json();
        const emailResponse = yield fetch("https://api.github.com/user/emails", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });
        const emails = yield emailResponse.json();
        const primaryEmail = ((_a = emails.find((e) => e.primary)) === null || _a === void 0 ? void 0 : _a.email) || null;
        const dbUser = {
            githubID: user.id.toString(),
            username: user.login,
            fname: ((_b = user.name) === null || _b === void 0 ? void 0 : _b.split(" ")[0]) || null,
            lname: ((_c = user.name) === null || _c === void 0 ? void 0 : _c.split(" ")[1]) || null,
            email: primaryEmail,
        };
        return dbUser;
    });
}
