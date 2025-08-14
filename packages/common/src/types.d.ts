import { z } from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const SignInSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const CreateRoomSchema: z.ZodObject<{
    roomName: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=types.d.ts.map