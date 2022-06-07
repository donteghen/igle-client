import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  if (!date) {
    return ''
  }
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  if (!date) {
    return ''
  }
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  if (!date) {
    return ''
  }
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  if (!date) {
    return ''
  }
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
