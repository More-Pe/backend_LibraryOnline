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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../database/models/User");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. recuperar la info
        const email = req.body.email;
        const password = req.body.password;
        // 2. validar la info
        if (!email || !password) {
            return res.json(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        // TODO validar formato email
        if (password.length < 8 || password.length > 12) {
            return res.status(400).json({
                success: false,
                message: "Password is not valid, 8 to 12 charachters must be needed",
            });
        }
        // 3. tratar la info si hace falta
        // TODO encriptar password
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        // 4. guardar en bd
        const newUser = yield User_1.User.create({
            email: email,
            password: hashedPassword,
        }
        // {
        //   email,
        //   password
        // }
        ).save();
        // 5. responder
        res.status(201).json({
            success: true,
            message: "user registered",
            data: newUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "user cant be registered",
            error: error,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //1. Get info
        const { email, password } = req.body;
        //2. Validar info
        if (!email || !password) {
            return res.status(400).json({
                succes: false,
                message: "Email and password are needed",
            });
        }
        //3. Comprobar si el usuario existe
        const user = yield User_1.User.findOne({
            where: { email: email },
        });
        if (!user) {
            return res.status(400).json({
                succes: false,
                message: "Email or password not valid",
            });
        }
        //4. Comprobar la contraseña
        const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
        if (isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Email or password not valid",
            });
        }
        res.status(200).json({
            success: true,
            message: "User logged",
        });
        console.log(user);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be logged in",
            error: error,
        });
    }
});
exports.login = login;
