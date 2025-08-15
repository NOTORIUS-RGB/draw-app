import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common';
import { Middleware } from "./middleware.js";
import { CreateUserSchema, SignInSchema,CreateRoomSchema } from "@repo/common";
import {prisma} from "db/client";
import { Sign } from "crypto";
const app = express();
app.use(express.json());


app.post("/signup", async (req: express.Request, res: express.Response) => {
    // zod validation
    const result = CreateUserSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.flatten().fieldErrors
        });
    }
   try {  
    const user = await prisma.user.create({
      data: {
        email: result.data.username,
        password: result.data.password,
        name: result.data.name
      }
    });
    
    res.json({
      userId: user.id
    });
  }
catch(e)
{
         res.status(409).json({
       message: "User already exists"
     });
}


    
});

app.post("/signin", async(req: express.Request, res: express.Response) => {
   const result=SignInSchema.safeParse(req.body);
   if(!result.success) {
       return res.status(400).json({
           errors: result.error.flatten().fieldErrors
       });
   }
   const user = await prisma.user.findUnique({
    where: { email: result.data.username,
      password: result.data.password
    }
  })
    if(!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);
    res.json({
        token
    });
});

app.post("/room", Middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // @ts-ignore: TODO: Fix this
    const userId = req.userId;

    try {
        const room = await prisma.room.create({
            data: {
                slug: parsedData.data.roomName,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})

app.listen(3001, () => {
  console.log('HTTP Backend server running on port 3001');
});