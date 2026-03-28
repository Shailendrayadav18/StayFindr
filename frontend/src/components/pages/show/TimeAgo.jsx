import { formatDistanceToNowStrict } from "date-fns";

export default function TimeAgo({ date }) {
  return (
    <span>
      {formatDistanceToNowStrict(new Date(date), { addSuffix: true })}
    </span>
  );
}
