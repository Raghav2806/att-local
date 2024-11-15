import { accessChecker, genQr } from "../services/userServices.js";
import { ApiError } from "../errors/ApiError.js";

export async function generateQr(req, res, next) {
  try {
    const url = await genQr(req.body);
    res.status(201).json({ message: "Event saved.", url: url });
  } catch (err) {
    if ((err.message = "User already exists")) {
      next(ApiError.badRequest(err.message));
    } else {
      next(ApiError.badRequest(err.message));
    }
  }
}

export async function checkAccess(req, res, next) {
  try {
    const access = await accessChecker(req.body, req.params);
    res.status(201).json({ message: "Event saved.", accessGranted: access });
  } catch (err) {
    if ((err.message = "User already exists")) {
      next(ApiError.badRequest(err.message));
    } else {
      next(ApiError.badRequest(err.message));
    }
  }
}