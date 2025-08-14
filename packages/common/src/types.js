import { z } from "zod";
export const CreateUserSchema = z.object({
    username: z.string().min(2).max(100),
    name: z.string().min(2).max(100),
    password: z.string().min(8).max(100),
});
export const SignInSchema = z.object({
    username: z.string().min(2).max(100),
    password: z.string().min(8).max(100),
});
export const CreateRoomSchema = z.object({
    roomName: z.string().min(2).max(100),
});
