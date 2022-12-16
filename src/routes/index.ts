import express, { Request, Response } from 'express';

import pokemonsRoutes from "./pokemons/pokemons.route";

const router = express.Router();

router.get("/", (req: Request, res: Response) => { res.status(200).send({ message: "Looqbox Challange Backend Web API Rest" }); });

router.use("/pokemons", pokemonsRoutes);

export default router;