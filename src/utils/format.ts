export const shortWalletAddress = (address?: string) => {
  return address && `${address.substring(0, 4)}...${address.slice(-4)}`
}
