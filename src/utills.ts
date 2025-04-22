export const formatTime = (timestamp?: string) => {
  if (!timestamp) return 'Time not specified';

  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
