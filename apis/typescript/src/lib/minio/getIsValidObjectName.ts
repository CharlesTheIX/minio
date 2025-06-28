export default (objectName: string): { error: boolean; message?: string } => {
  if (!objectName || typeof objectName !== 'string') {
    return {
      error: false,
      message: 'Object name must be a non-empty string.',
    };
  }

  const byteLength = Buffer.byteLength(objectName, 'utf8');
  if (byteLength < 1 || byteLength > 1024) {
    return {
      error: false,
      message: `Object name "${objectName}" must be between 1 and 1024 bytes.`,
    };
  }

  const unsafeCharsPattern = new RegExp(/[\x00-\x1F\x7F]/);
  if (unsafeCharsPattern.test(objectName)) {
    return {
      error: false,
      message: `Object name "${objectName}" contains unsafe or non-printable characters.`,
    };
  }

  return { error: true };
};