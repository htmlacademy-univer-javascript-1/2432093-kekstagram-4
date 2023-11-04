
function isMeetingWithinWorkingHours(startWorking, endWorking, startMeeting, duration) {
  const [startWorkingHours, startWorkingMinutes] = startWorking.split(':').map(Number);
  const [endWorkingHours, endWorkingMinutes] = endWorking.split(':').map(Number);
  const [startMeetingHours, startMeetingMinutes] = startMeeting.split(':').map(Number);

  const endMeetingHours = Math.floor(duration / 60);
  const endMeetingMinutes = duration % 60;

  const totalMeetingMinutes = startMeetingHours * 60 + startMeetingMinutes + endMeetingHours * 60 + endMeetingMinutes;
  const endMeetingTimeHours = Math.floor(totalMeetingMinutes / 60);
  const endMeetingTimeMinutes = totalMeetingMinutes % 60;

  if (
    startMeetingHours < startWorkingHours ||
    (startMeetingHours === startWorkingHours && startMeetingMinutes < startWorkingMinutes) ||
    endMeetingTimeHours > endWorkingHours ||
    (endMeetingTimeHours === endWorkingHours && endMeetingTimeMinutes > endWorkingMinutes)
  ) {
    return false;
  }

  return true;
}
