// @flow
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import sanitizeFilename from 'sanitize-filename';

dayjs.extend(utc);

export const defaultProps = {
  prefix: 'logs',
  extension: 'zip',
  isUTC: true,
  sanitize: true,
};

type Props = {
  prefix?: string,
  extension?: string,
  date?: dayjs.Dayjs,
  isUTC?: boolean,
  sanitize?: boolean,
};

export const generateFileNameWithTimestamp = (props?: Props = {}) => {
  const { prefix, extension, isUTC, sanitize } = {
    ...defaultProps,
    ...props,
  };
  let date = props.date || dayjs();
  let z = '';
  if (isUTC === true) {
    if (!props || !Object.prototype.hasOwnProperty.call(props, 'date'))
      date = date.utc();
    z = 'Z';
  }
  let fileName = `${prefix}-${`${date.format('YYYY-MM-DDTHHmmss.0SSS')}${z}`}${
    extension ? '.' : ''
  }${extension}`;
  if (sanitize) fileName = sanitizeFilename(fileName);
  return fileName;
};

export const isFileNameWithTimestamp = (
  prefix: string = 'logs',
  extension: string = 'zip'
) => (fileName: string) =>
  fileName.match(
    RegExp(
      `(${prefix}-)([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{6}.0[0-9]{3}Z)(.${extension})`
    )
  );

export const getPathSlash = (path: string) =>
  path.indexOf('/') > -1 ? '/' : '\\';

export const extractFileNameFromPath = (path: string) =>
  path.substr(path.lastIndexOf(getPathSlash(path)) + 1);
