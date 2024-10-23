export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  if (minutes > 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  } else {
    return `00:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  }
};

export const formatISODate = (dateString: Date) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');

  return `${day}.${month}.${year}`;
};

export const convertToMilliseconds = (timeString: string) => {
  const [minutes, seconds, centiseconds] = timeString.split(':').map(Number);
  return Math.abs(minutes * 60 * 1000 + seconds * 1000 + centiseconds * 10);
};

export const convertFromMilliseconds = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const centiseconds = Math.floor((milliseconds % 1000) / 10);

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
};
