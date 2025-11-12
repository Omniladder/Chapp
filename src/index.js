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
const express_1 = __importDefault(require("express"));
const auth_1 = require("./services/Auth/auth");
const signout_1 = require("./services/Signout/signout");
const friendFunctions_1 = require("./services/FriendFunctions/friendFunctions");
const oauth_1 = require("./services/Auth/oauth");
const db_1 = __importDefault(require("./dbFiles/db"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
testServer(); //Simply Checks Server Connections
//app.use(express.urlencoded({ extended: true }));
function testServer() {
    return __awaiter(this, void 0, void 0, function* () {
        //Test SQL Server Connection
        try {
            yield db_1.default.authenticate();
            console.log('Connected to DB');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
/*
app.listen(port, '0.0.0.0', () => {
  console.log(`Running Chapp on port ${port}`);
});
*/
// Test used for Kubernetes to see if Container is up
app.get('/health', (req, res) => {
    res.status(200).send("Healthy Container :D");
});
app.post('/api/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received Sign Up");
    let output = yield (0, auth_1.addUser)(req);
    if (!output.success)
        return res.status(400).json(output);
    else
        return res.status(201).json(output);
}));
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received Login");
    let output = yield (0, auth_1.login)(req);
    if (!output.success) {
        return res.status(400).json(output);
    }
    else {
        return res.status(201).json(output);
    }
}));
app.get('/api/google', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Google Auth Called");
    yield (0, oauth_1.googleAuth)(req, res);
}));
app.get('/api/googleToken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Google Token Called");
    yield (0, oauth_1.googleToken)(req, res);
}));
app.get('/api/github', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Github Auth Called");
    yield (0, oauth_1.githubAuth)(req, res);
}));
app.get('/api/githubToken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Github Token Called");
    yield (0, oauth_1.githubToken)(req, res);
}));
app.delete('/api/removeFriend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting a Friend");
    let output = yield (0, friendFunctions_1.removeFriend)(req);
    if (!output.success) {
        return res.status(400).json(output);
    }
    else {
        return res.status(201).json(output);
    }
}));
app.delete('/api/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received Account Deletion");
    let output = yield (0, signout_1.deleteAccount)(req);
    if (!output.success) {
        return res.status(400).json(output);
    }
    else {
        return res.status(201).json(output);
    }
}));
app.delete("/api/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received Logout Request");
    let output = yield (0, signout_1.logout)(req);
    if (!output.success) {
        return res.status(400).json(output);
    }
    else {
        return res.status(201).json(output);
    }
}));
app.get("/api/isExpired", (req, res) => {
    console.log("Session Check Requested");
    if (!req.session.userID) {
        console.log("Not Logged in");
        return res.status(401).send('Not logged in');
    }
    else {
        console.log("Still Logged in");
        return res.status(200).send('Still Logged in');
    }
});
app.post("/api/findFriends", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Searching For New Friends");
    let output = yield (0, friendFunctions_1.queryPeople)(req);
    if (output.success) {
        console.log("Successsfully Queried");
        return res.status(200).json(output);
    }
    else {
        console.error("Failed to Query Friends");
        return res.status(401).json(output);
    }
}));
app.post("/api/addFriend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Adding A New Friend");
    let output = yield (0, friendFunctions_1.addFriend)(req);
    if (output.success) {
        console.log("Successsfully Added Friend");
        return res.status(200).json(output);
    }
    else {
        console.error("Failed to Add Friends");
        return res.status(401).json(output);
    }
}));
app.get("/api/getFriends", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting Friends");
    let output = yield (0, friendFunctions_1.getFriends)(req);
    if (output.success) {
        console.log("Successsfully Found Friend");
        return res.status(200).json(output);
    }
    else {
        console.error("Failed to Find Friends");
        return res.status(401).json(output);
    }
}));
exports.default = app;
