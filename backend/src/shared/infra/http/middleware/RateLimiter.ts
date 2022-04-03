import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import AppError from "@shared/errors/AppErrors";

const redisClient = new Redis({
 host: process.env.REDIS_HOST,
 port: Number(process.env.REDIS_PORT),
 password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
 storeClient: redisClient,
 keyPrefix: "ratelimit",
 points: 5, // how many points to take from the user
 duration: 1, // per second
 blockDuration: 15, // time to block the user
});



export default async function rateLimiter(req: Request, res: Response, next: NextFunction):Promise<any> {
 try {
  await limiter.consume(req.ip); //consume by ip address
  return next();
 } catch (err) {
 throw new AppError('Too many requests', 429);
 
 }

}