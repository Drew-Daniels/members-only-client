"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Layout_1 = __importDefault(require("./components/Layout"));
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const SignupPage_1 = __importDefault(require("./pages/SignupPage"));
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
const Logout_1 = __importDefault(require("./pages/Logout"));
const MembershipPage_1 = __importDefault(require("./pages/MembershipPage/MembershipPage"));
const metadata_1 = __importDefault(require("./contexts/metadata"));
const user_1 = require("./contexts/user");
require("./index.css");
const Metadata = {
  title: 'Members Only',
  author: 'Drew Daniels',
  githubUrl: 'https://github.com/Drew-Daniels/members-only',
};
function App() {
  const { user, setUser } = (0, user_1.useUser)();
  const [messages, setMessages] = (0, react_1.useState)([]);
  (0, react_1.useEffect)(() => {
    checkAuth();
    function checkAuth() {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth`, {})
        .then(res => res.json())
        .then(res => {
          if (res.user) {
            setUser(res.user);
          }
        });
    }
  }, []);
  (0, react_1.useEffect)(() => {
    loadMessages();
    function loadMessages() {
      // get data from backend api
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {})
        .then(res => res.json())
        .then(res => {
          setMessages(res.messages);
        });
    }
    // TODO: Reload messages from api when user state changes
  }, [user]);
  function refetchMessages() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {})
      .then(res => res.json())
      .then(res => {
        setMessages(res.messages);
      });
  }
  return (react_1.default.createElement("div", { className: 'App' },
    react_1.default.createElement(metadata_1.default.Provider, { value: Metadata },
      react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
          react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(HomePage_1.default, { messages: messages, refetchMessages: refetchMessages }) }),
          react_1.default.createElement(react_router_dom_1.Route, { path: '/signup', element: react_1.default.createElement(SignupPage_1.default, null) }),
          react_1.default.createElement(react_router_dom_1.Route, { path: '/login', element: react_1.default.createElement(LoginPage_1.default, null) }),
          react_1.default.createElement(react_router_dom_1.Route, { path: '/membership', element: react_1.default.createElement(MembershipPage_1.default, null) }),
          react_1.default.createElement(react_router_dom_1.Route, { path: '/logout', element: react_1.default.createElement(Logout_1.default, null) }))))));
}
exports.default = App;
