import { Router } from "express";
import { MeetingController } from "../controller/meeting.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { createMeetingValidator } from "../validators/create-meeting.validator";
import { updateMeetingValidator } from "../validators/update-meeting.validator";

const router = Router();

router.use(authMiddleware);

router.post("/", validateMiddleware(createMeetingValidator), MeetingController.createMeeting);
router.get("/", MeetingController.getMeetings);
router.get("/:id", MeetingController.getMeetingById);
router.patch("/:id", validateMiddleware(updateMeetingValidator), MeetingController.updateMeeting);
router.delete("/:id", MeetingController.deleteMeeting);

export default router;
