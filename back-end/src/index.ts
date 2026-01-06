import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";

import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import orderRoutes from "./routes/order.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: config.NODE_ENV === "production",
            httpOnly: true,
            sameSite: config.NODE_ENV === "production" ? "none" : "lax",
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true,
    })
);

app.get(
    `/`,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        throw new BadRequestException(
            "This is a bad request",
            ErrorCodeEnum.AUTH_INVALID_TOKEN
        );
    })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/product`, isAuthenticated, productRoutes);
app.use(`${BASE_PATH}/order`, isAuthenticated, orderRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
    console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
    await connectDatabase();
});