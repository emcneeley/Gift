import { AboutController } from "./controllers/AboutController.js";
import { GiftsController } from "./controllers/GiftsController.js";
import { HomeController } from "./controllers/HomeController.js";

export const router = [
  {
    path: '',
    controller: GiftsController
  }
]