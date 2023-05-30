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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
//import PostModel from '../models/post.model';
const userNOSQL_1 = __importStar(require("../modelsNOSQL/userNOSQL"));
class PermissionMiddleware {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new PermissionMiddleware();
        return this.instance;
    }
    /**
     * Verify that the current user is an Supervisor
     */
    checkIsSupervisor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userNOSQL_1.default.get(req.user, '', {
                    AttributesToGet: ['role'],
                });
                if (user.attrs.role === userNOSQL_1.UserRoles.SUPERVISOR) {
                    next();
                }
                else {
                    res.status(401).send({ code: 'UserNotSupervisorException', message: 'The logged account is not an supervisor' });
                }
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message });
            }
        });
    }
    /**
     * Verify that the current user is an admin
     */
    checkIsAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userNOSQL_1.default.get(req.user, '', {
                    AttributesToGet: ['role'],
                });
                if (user.attrs.role === userNOSQL_1.UserRoles.ADMIN) {
                    next();
                }
                else {
                    res.status(401).send({ code: 'UserNotAdminException', message: 'The logged account is not an admin' });
                }
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message });
            }
        });
    }
}
exports.default = PermissionMiddleware;