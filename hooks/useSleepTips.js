import { useEffect, useState } from "react";
import { useAsyncStorage } from "./asyncStorage";
import tipsList from "../data/tips.json";

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export default function useSleepTips() {
  // store tips that are already read by the user
  const [readTips, setReadTips, clearReadTips] = useAsyncStorage(
    "readTips",
    []
  );
  const [activeTip, setActiveTip] = useState(null);

  const allTips = tipsList;

  const getTip = (id) => allTips.find((tip) => tip.id === id);

  const calcActiveTip = () => {
    const readTipIds = readTips.map((tip) => tip.id);
    const unreadTips = allTips.filter((tip) => !readTipIds.includes(tip.id));
    if (!unreadTips.length) {
      // if no more unread tips, start over again by resetting readTips
      setReadTips([]);
    }
    // check if the last read tip was read today, in that case we're
    // not returning a new tip.
    const lastRead = readTips[readTips.length - 1];
    const lastReadIsToday = lastRead
      ? datesAreOnSameDay(new Date(), new Date(lastRead.date))
      : false;
    // the active tip is either todays read tip or the next unread tip
    return lastReadIsToday
      ? getTip(lastRead.id)
      : unreadTips[unreadTips.length - 1];
  };

  useEffect(() => {
    setActiveTip(calcActiveTip);
    // readTips as dependency, we only need to recalculate the current active tip
    // when the tips read by the user change.
  }, [readTips]);

  const addToRead = async (tipId) =>
    setReadTips([...readTips, { id: tipId, date: new Date() }]);

  return { activeTip, addToRead, clearReadTips };
}
