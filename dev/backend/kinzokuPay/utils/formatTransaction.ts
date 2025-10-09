import { getUserEmailById } from "./helperFunction";

export const formatTransaction = async (t: any, userId: string) => {
  const fromId = t.from?._id?.toString() || t.from?.toString();
  const toId = t.to?._id?.toString() || t.to?.toString();

  // Use your helper function to get emails
  const fromEmail = fromId
    ? await getUserEmailById(fromId)
    : "unknown@user.com";
  const toEmail = toId ? await getUserEmailById(toId) : "unknown@user.com";

  const direction =
    t.type === "request"
      ? toId === userId
        ? "incoming"
        : "outgoing"
      : t.type === "transfer"
      ? fromId === userId
        ? "sent"
        : "received"
      : "received"; // add money treated as received

  return {
    id: t._id.toString(),
    type: t.type,
    amount: t.amount / 100,
    description: t.description || "",
    from: fromId,
    to: toId,
    fromEmail,
    toEmail,
    status: t.status,
    createdAt: t.createdAt,
    finalizedAt: t.finalizedAt || null,
    expiresAt: t.expiresAt || null,
    direction,
  };
};
