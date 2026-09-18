export const closeDrawer = () => {
  const closeButton: HTMLElement | null = document.querySelector(
    '.mantine-Drawer-close'
  )
  if (closeButton) closeButton.click()
}
