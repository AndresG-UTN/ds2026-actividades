import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { validateBody, validateParams } from "../middlewares/validate.middleware";
import {
  idParamSchema,
  libroCreateSchema,
  libroUpdateSchema,
} from "../validations/libro.validation";

const router = Router();

router.get("/", libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);
router.post("/", validateBody(libroCreateSchema), libroController.create);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(libroUpdateSchema),
  libroController.update
);
router.delete("/:id", validateParams(idParamSchema), libroController.remove);

export default router;