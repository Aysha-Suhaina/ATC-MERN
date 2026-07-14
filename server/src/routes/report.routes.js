import express from "express";

import 
  {exportCSV}
 from "../controller/report.controller.js";

import {
  exportDailyExcel,
} from "../controller/report.controller.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router =
  express.Router();

router.get(

  "/:type/csv",

  authenticate,

  authorize("admin"),

  exportCSV

);

router.get(

  "/:type/excel",

  authenticate,

  authorize("admin"),

  exportDailyExcel

);


router.get(

  "/:type/:id/csv",

  authenticate,

  authorize("admin"),

  exportCSV

);

router.get(

  "/:type/:id/excel",

  authenticate,

  authorize("admin"),

  exportDailyExcel

);
export default router;