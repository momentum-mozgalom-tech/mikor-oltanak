import * as React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../store/selectors";
import { SurgeryPageLoggedIn } from "./surgeryPageLoggedIn";
import { SurgeryPageNotLoggedIn } from "./surgeryPageNotLoggedIn";

export function SurgeryPage() {
    const currentUserId = useSelector(selectCurrentUserId);
    return currentUserId === undefined ? <SurgeryPageNotLoggedIn /> : <SurgeryPageLoggedIn surgeryId={currentUserId} />;
}
