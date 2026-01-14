import { after } from "@vendetta/patcher";
import { findByName } from "@vendetta/metro";
import { setEdited, getEdited } from "./storage";

const MessageContent = findByName("MessageContent", false);

let unpatch;

export function onLoad() {
  if (!MessageContent) {
    console.log("[LocalMessageEditor] MessageContent not found");
    return;
  }

  unpatch = after("default", MessageContent, (_, [props], res) => {
    const message = props?.message;
    if (!message || !res?.props) return;

    const edited = getEdited(message.id);
    if (edited) {
      res.props.content = edited;
    }

    res.props.onDoubleClick = () => {
      const newText = prompt(
        "Edit message locally:",
        edited ?? message.content
      );
      if (newText !== null) {
        setEdited(message.id, newText);
      }
    };
  });

  console.log("[LocalMessageEditor] Loaded");
}

export function onUnload() {
  unpatch?.();
  console.log("[LocalMessageEditor] Unloaded");
}
