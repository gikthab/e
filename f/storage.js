const editedMessages = new Map();

export function setEdited(messageId, content) {
  editedMessages.set(messageId, content);
}

export function getEdited(messageId) {
  return editedMessages.get(messageId);
}

export function clearEdited(messageId) {
  editedMessages.delete(messageId);
}
