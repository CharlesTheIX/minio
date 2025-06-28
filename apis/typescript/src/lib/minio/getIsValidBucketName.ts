export default (bucketName: string): { error: boolean, message?: string } => {
  if (!bucketName || bucketName.length < 3 || bucketName.length > 63) {
    return { error: false, message: `Bucket name ${bucketName} must have a length between 3 and 63 characters long.` }
  }
  
  if (bucketName.includes("..")) {
    return { error: false, message: `Bucket name ${bucketName} must not contain consecutive '.' characters.` }
  }
  
  const validPattern = new RegExp(/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/);
  if (!validPattern.test(bucketName)) {
    return {
      error: false,
      message: `Bucket name ${bucketName} is not valid. It must only contain only upper and lowercase letters, numbers, '.', '-' and must start and end with a letter or number.`
    }
  }
  
  const ipAddressPattern = new RegExp(/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/);
  if (!ipAddressPattern.test(bucketName)) {
    return {
      error: false,
      message: `Bucket name ${bucketName} is not valid. It must not have the same pattern as an IP address.`
    }
  }

  return { error: true }
}